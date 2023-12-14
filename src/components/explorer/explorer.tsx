import { useStore } from "zustand";
import Items from "./items";
import { themeStore } from "@/stores/themeStore";

import { VscAdd } from "react-icons/vsc";
import { utilityStore } from "@/stores/utiltyStore";

export default function Explorer() {
  const { currentTheme } = useStore(themeStore);
  const { setCreateModal } = useStore(utilityStore);

  return (
    <section
      className={`${currentTheme.bg1} ${currentTheme.text} w-1/5 overflow-y-scroll px-4 py-10 drop-shadow-lg`}
    >
      <Items />
      <button
        className={`${currentTheme.hover} flex h-20 w-full items-center justify-center rounded text-start text-5xl transition`}
        onClick={() => setCreateModal()}
      >
        <VscAdd />
      </button>
    </section>
  );
}
