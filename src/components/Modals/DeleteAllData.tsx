import { themeStore } from "@/Stores/ThemeStore";
import { db } from "@/db";
import { utilityStore } from "@/Stores/UtiltyStore";
import { motion } from "framer-motion";
import { useStore } from "zustand";
import { useCallback } from "react";

export default function DeleteAllData() {
  const { setDeleteAllDataModal } = useStore(utilityStore);
  const { auxTheme } = useStore(themeStore);
  const deleteTable = useCallback(async () => await db.myData.clear(), []);

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/50 backdrop-blur-sm`}
      onClick={() => {
        setDeleteAllDataModal();
      }}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div
        className={`flex h-48 w-96 flex-col items-center justify-evenly rounded-lg bg-c2 px-16 text-xl text-c3`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className={`text-center`}>
          You are deleting all data. <br />
          Do you want to proceed?
        </h1>
        <div className={`flex w-full items-center justify-between`}>
          <button
            className={` rounded px-2 py-1 text-main-color`}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteAllDataModal();
              deleteTable();
              window.location.reload();
            }}
            style={{ color: auxTheme }}
          >
            Delete
          </button>
          <button
            className={`rounded px-2 py-1`}
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
