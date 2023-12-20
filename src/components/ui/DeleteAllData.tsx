import { db } from "@/db";
import { themeStore } from "@/stores/themeStore";
import { utilityStore } from "@/stores/utiltyStore";
import { motion } from "framer-motion";
import { useStore } from "zustand";

export default function DeleteAllData() {
  const { setDeleteAllDataModal } = useStore(utilityStore);
  const { currentTheme } = useStore(themeStore);
  const deleteTable = async () => await db.myData.clear();

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/75`}
      onClick={() => {
        setDeleteAllDataModal();
      }}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div
        className={`${currentTheme.bg2} ${currentTheme.text} flex h-48 w-96 flex-col items-center justify-evenly rounded-3xl px-16 text-xl`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className={`text-center`}>
          You are deleting all data. Do you want to proceed?
        </h1>
        <div className={`flex w-full items-center justify-between`}>
          <button
            className={`${currentTheme.hover} rounded px-2 py-1 text-main-color`}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteAllDataModal();
              deleteTable();
              window.location.reload();
            }}
          >
            Delete
          </button>
          <button
            className={`${currentTheme.hover} rounded px-2 py-1`}
            onClick={() => {
              setDeleteAllDataModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
