import { create } from "zustand";
import { EditorType } from "./Types";

const editorStore = create<EditorType>()((set) => ({
  sourceMode: false,
  setSourceMode: (e) => set(() => ({ sourceMode: e })),
  currentPage: "",
  setCurrentPage: (e) => set(() => ({ currentPage: e })),
  tabs: [],
  setTabs: (e) => set(() => ({ tabs: e })),
  content: "",
  setContent: (e) => set(() => ({ content: e })),
  items: [],
  setItems: (e) => set(() => ({ items: e })),
  currentItem: "",
  setCurrentItem: (e) => set(() => ({ currentItem: e })),
}));

export { editorStore };
