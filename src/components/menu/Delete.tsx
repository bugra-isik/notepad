import { utilityStore } from "@/stores/utiltyStore";
import { useStore } from "zustand";

export default function Delete() {
  const { setDeleteAllDataModal } = useStore(utilityStore);

  return (
    <button
      className={`h-20 w-40 bg-red-900`}
      onClick={() => setDeleteAllDataModal()}
    >
      Delete All Data
    </button>
  );
}
