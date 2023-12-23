import { themeStore } from "@/Stores/ThemeStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { useStore } from "zustand";

export default function NewFile() {
  const { auxTheme } = useStore(themeStore);
  const { setCreateModal } = useStore(utilityStore);

  return (
    <section className={`flex basis-4/5 items-center justify-center`}>
      <button
        className={`text-4xl transition`}
        onClick={() => setCreateModal()}
        style={{ color: auxTheme }}
      >
        Create a new file
      </button>
    </section>
  );
}
