import { create } from "zustand";
import { Utility } from "./Types";

const utilityStore = create<Utility>()((set) => ({
  createModal: false,
  setCreateModal: () => set((e) => ({ createModal: !e.createModal })),
  editModal: false,
  setEditModal: () => set((e) => ({ editModal: !e.editModal })),
  deleteAllDataModal: false,
  setDeleteAllDataModal: () =>
    set((e) => ({ deleteAllDataModal: !e.deleteAllDataModal })),
  searchModal: false,
  setSearchModal: () => set((e) => ({ searchModal: !e.searchModal })),
}));

export { utilityStore };
