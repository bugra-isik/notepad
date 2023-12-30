import { themeStore } from "@/Stores/ThemeStore";
import { VscSearch } from "react-icons/vsc";
import { useStore } from "zustand";
import { utilityStore } from "@/Stores/UtiltyStore";

export default function Search() {
  const { currentTheme } = useStore(themeStore);
  const { setSearchModal } = useStore(utilityStore);
  const { bg2, border,hover } = currentTheme;

  return (
    <button
      className={`${bg2} ${border} ${hover} flex h-16 items-center justify-center gap-4 rounded border`}
      onClick={() => setSearchModal()}
    >
      <VscSearch />
      Search your note
    </button>
  );
}
