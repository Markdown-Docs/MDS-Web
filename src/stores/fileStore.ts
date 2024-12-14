import { create } from 'zustand'

interface FileState {
  fileId: number
  increment: () => void
  decrement: () => void
  setFileId: (id: number) => void
}
//TODO: получать по запросу регулярно список id и выбирать по ним
//TODO: если нет свободных id, то предложить создать новый файл

export const useFileStore = create<FileState>((set) => ({
  fileId: 1,
  increment: () => set((state) => ({ fileId: state.fileId + 1 })),
  decrement: () => set((state) => ({ fileId: Math.max(1, state.fileId - 1) })),
  setFileId: (id) => set({ fileId: id }),
})) 
