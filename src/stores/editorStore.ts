import { create } from "zustand";
import { editorType } from "./types";

const editorStore = create<editorType>()((set) => ({
  sourceMode: false,
  setSourceMode: () => set((e) => ({ sourceMode: !e.sourceMode })),
  currentPage: "",
  setCurrentPage: (e) => set(() => ({ currentPage: e })),
  tabs: [],
  setTabs: (e) => set(() => ({ tabs: e })),
  content: "",
  setContent: (e) => set(() => ({ content: e })),
}));

export { editorStore };
