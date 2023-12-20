import { AnimatePresence } from "framer-motion";
import { useStore } from "zustand";
import { utilityStore } from "@/stores/utiltyStore";
import CreateItem from "./CreateItem";
import DeleteAllData from "./DeleteAllData";
import EditItem from "./EditItem";

export default function Modals() {
  const { createModal, editModal, deleteAllDataModal } = useStore(utilityStore);
  return (
    <>
      <AnimatePresence>{createModal && <CreateItem />}</AnimatePresence>
      <AnimatePresence>{editModal && <EditItem />}</AnimatePresence>
      <AnimatePresence>
        {deleteAllDataModal && <DeleteAllData />}
      </AnimatePresence>
    </>
  );
}
