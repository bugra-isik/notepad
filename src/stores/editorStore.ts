import { create } from "zustand";
import { editorType } from "./types";

const editorStore = create<editorType>()((set) => ({
  sourceMode: true,
  setSourceMode: () => set((e) => ({ sourceMode: !e.sourceMode })),
  currentPage: "Welcome",
  setCurrentPage: (e) => set(() => ({ currentPage: e })),
  tabs: ["xqhgt", "plfso"],
  setTabs: (e) => set(() => ({ tabs: e })),
}));

export { editorStore };
