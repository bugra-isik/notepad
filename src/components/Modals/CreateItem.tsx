import { themeStore } from "@/Stores/ThemeStore";
import { db } from "@/db";
import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef } from "react";
import { useStore } from "zustand";
import ModalAlert from "./ModalAlert";

export default function CreateItem() {
  const { setCreateModal, setAlertModal, alertModal } = useStore(utilityStore);
  const { auxTheme } = useStore(themeStore);
  const { items, setItems } = useStore(editorStore);
  const ref = useRef<HTMLInputElement>(null);

  const addData = useCallback(async (title: string) => {
    await db.myData.put({
      title: title,
      content: "",
    });
  }, []);

  const alertHandler = () => {
    setAlertModal();
    setTimeout(() => {
      setAlertModal();
    }, 2000);
  };

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/50 text-c3 backdrop-blur-sm`}
      onClick={() => {
        setCreateModal();
      }}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <AnimatePresence>{alertModal && <ModalAlert />}</AnimatePresence>
      <div
        className={`flex h-48 w-96 flex-col items-center justify-evenly rounded-lg bg-c2 px-16 text-xl`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className={`text-center`}>Enter file name</h1>
        <input
          ref={ref}
          type="text"
          autoFocus
          className={`btn-hover h-1/4 w-full rounded bg-c2 px-4 outline-none transition`}
        />
        <div className={`flex w-full items-center justify-between`}>
          <button
            className={`rounded px-2 py-1`}
            onClick={(e) => {
              e.stopPropagation();
              if (ref.current && items.includes(ref.current.value)) {
                !alertModal && alertHandler();
              }
              if (
                ref.current &&
                ref.current.value !== "" &&
                !items.includes(ref.current.value)
              ) {
                setItems([...items, ref.current.value]);
                addData(ref.current.value);
                setCreateModal();
              }
            }}
            style={{ color: auxTheme }}
          >
            Create
          </button>
          <button
            className={` rounded px-2 py-1`}
            onClick={() => {
              setCreateModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
