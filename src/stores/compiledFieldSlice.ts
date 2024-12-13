import { create } from "zustand";

interface CompiledFieldState {
   text: string;
   setText: (text: string) => void;
}

export const useCompiledFieldStore = create<CompiledFieldState>((set) => ({
   text: "Something compiled!",
   setText: (text: string) => set({ text }),
}));
