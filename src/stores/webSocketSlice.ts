import { create } from 'zustand';
import { Socket, Channel } from 'phoenix';

interface WebSocketState {
	socket: Socket | null;
	channel: Channel | null;
	previewChannel: Channel | null; // Добавляем preview канал
	content: string;
	previewContent: string; // Для HTML превью
	connect: (url: string, file_id: string) => void;
	disconnect: () => void;
	sendMessage: (message: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
	socket: null,
	channel: null,
	previewChannel: null, // Инициализация previewChannel
	content: '',
	previewContent: '',

	connect: (url: string, file_id: string) => {
		const socket = new Socket(url, { params: {} });
		socket.connect();

		const channel = socket.channel(`file:${file_id}`, {});
		const previewChannel = socket.channel(`preview:${file_id}`, {}); // Подключаем preview канал

		channel
			.join()
			.receive('ok', () => {
				console.log(`Connected to file: ${file_id}`);
				set({ channel });
			})
			.receive('error', (err) => console.error('Failed to join channel:', err));

		previewChannel
			.join()
			.receive('ok', () => {
				console.log(`Connected to preview:${file_id}`);
				set({ previewChannel });
			})
			.receive('error', (err) =>
				console.error('Failed to join preview channel:', err),
			);

		// Подписка на обновления текста
		channel.on('update', (payload) => {
			set({ content: payload.content });
		});

		// Обновляем содержимое HTML превью
		previewChannel.on('preview', (payload) => {
			set({ previewContent: payload.html });
		});

		set({ socket });
	},

	disconnect: () => {
		set((state) => {
			state.channel?.leave();
			state.previewChannel?.leave();
			state.socket?.disconnect();
			console.log('Disconnected from WebSocket');
			return {
				socket: null,
				channel: null,
				previewChannel: null,
				content: '',
				previewContent: '',
			};
		});
	},

	sendMessage: (message: string) => {
		set((state) => {
			state.channel?.push('edit', { content: message });
			return { content: message };
		});
	},
}));
