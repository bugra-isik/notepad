import { VscSearch } from "react-icons/vsc";
import { useStore } from "zustand";
import { utilityStore } from "@/Stores/UtiltyStore";

export default function Search() {
  const { setSearchModal } = useStore(utilityStore);

  return (
    <button
      className={`bg-c2 hover:bg-c3/10 border-c3 flex h-16 items-center justify-center gap-4 rounded border`}
      onClick={() => setSearchModal()}
    >
      <VscSearch />
      Search your note
    </button>
  );
}
