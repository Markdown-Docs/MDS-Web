import { create } from "zustand";

interface EditFieldState {
  text: string;
  setText: (text: string) => void;
}

export const useEditFieldStore = create<EditFieldState>((set) => ({
  text: "# Something to edit!\n\n## Subtitle\n\n### Subsubtitle\n\nHere is some code:\n\n```python\nprint('Hello, world!')\n```",
  setText: (text: string) => set({ text }),
}));
