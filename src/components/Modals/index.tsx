import { AnimatePresence } from "framer-motion";
import { useStore } from "zustand";

import CreateItem from "./CreateItem";
import DeleteAllData from "./DeleteAllData";
import EditItem from "./EditItem";
import { utilityStore } from "@/Stores/UtiltyStore";
import SearchData from "./SearchData";

export default function Modals() {
  const { createModal, editModal, deleteAllDataModal, searchModal } =
    useStore(utilityStore);
  return (
    <>
      <AnimatePresence>{searchModal && <SearchData />}</AnimatePresence>
      <AnimatePresence>{createModal && <CreateItem />}</AnimatePresence>
      <AnimatePresence>{editModal && <EditItem />}</AnimatePresence>
      <AnimatePresence>
        {deleteAllDataModal && <DeleteAllData />}
      </AnimatePresence>
    </>
  );
}
