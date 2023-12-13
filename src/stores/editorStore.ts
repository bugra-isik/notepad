import { create } from "zustand";
import { EditorType } from "./types";

const editorStore = create<EditorType>()((set) => ({
  sourceMode: false,
  setSourceMode: () => set((e) => ({ sourceMode: !e.sourceMode })),
  currentPage: "",
  setCurrentPage: (e) => set(() => ({ currentPage: e })),
  tabs: [],
  setTabs: (e) => set(() => ({ tabs: e })),
  content: "",
  setContent: (e) => set(() => ({ content: e })),
  items: [],
  setItems: (e) => set(() => ({ items: e })),
}));

export { editorStore };
