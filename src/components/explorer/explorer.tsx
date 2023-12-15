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
      className={`${currentTheme.bg1} ${currentTheme.text} relative w-1/5  px-4 pt-8`}
    >
      <div className={`h-full w-full overflow-y-scroll`}>
        <Items />
        <button
          className={`${currentTheme.hover} flex h-20 w-full items-center justify-center rounded text-start text-3xl transition`}
          onClick={() => setCreateModal()}
        >
          <VscAdd />
        </button>
      </div>
    </section>
  );
}
