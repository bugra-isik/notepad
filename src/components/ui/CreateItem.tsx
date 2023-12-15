import { db } from "@/db";
import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import { utilityStore } from "@/stores/utiltyStore";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useStore } from "zustand";

export default function CreateItem() {
  const { setCreateModal } = useStore(utilityStore);
  const { currentTheme } = useStore(themeStore);
  const { items, setItems, currentItem } = useStore(editorStore);
  const ref = useRef<HTMLInputElement>(null);

  const addData = async (title: string) => {
    await db.myData.put({
      title: title,
      content: "",
    });
  };

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/75`}
      onClick={() => {
        setCreateModal();
      }}
    >
      <motion.div
        // Vibration
        // animate={{ translateX: [5, -5, 5, -5, 5, -5, 0] }}
        // transition={{ ease: "linear", duration: 0.3 }}
        className={`${currentTheme.bg2} ${currentTheme.text} flex h-48 w-96 flex-col items-center justify-evenly rounded-3xl px-16 text-xl`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className={`text-center`}>Enter file name</h1>
        <input
          ref={ref}
          type="text"
          autoFocus
          className={`${currentTheme.bg2} ${currentTheme.hover} h-1/4 w-full rounded px-4 outline-none transition`}
        />
        <div className={`flex w-full items-center justify-between`}>
          <button
            className={`${currentTheme.hover} rounded px-2 py-1 text-main-color`}
            onClick={(e) => {
              e.stopPropagation();
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
          >
            Create
          </button>
          <button
            className={`${currentTheme.hover} rounded px-2 py-1`}
            onClick={() => {
              setCreateModal();
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
