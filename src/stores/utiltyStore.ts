import { create } from "zustand";
import { Utility } from "./types";

const utilityStore = create<Utility>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: () => set((e) => ({ isModalOpen: !e.isModalOpen })),
}));

export { utilityStore };
