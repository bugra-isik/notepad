import { create } from "zustand";
import { Utility } from "./types";

const utilityStore = create<Utility>()((set) => ({
  createModal: false,
  setCreateModal: () => set((e) => ({ createModal: !e.createModal })),
  editModal: false,
  setEditModal: () => set((e) => ({ editModal: !e.editModal })),
}));

export { utilityStore };