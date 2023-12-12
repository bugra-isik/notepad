import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import { utilityStore } from "@/stores/utiltyStore";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useStore } from "zustand";

export default function Modal() {
  const { setIsModalOpen } = useStore(utilityStore);
  const { currentTheme } = useStore(themeStore);
  const { setItems } = useStore(editorStore);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/75`}
      onClick={() => {
        setIsModalOpen();
      }}
    >
      <div
        className={`${currentTheme.bg2} ${currentTheme.text} flex h-48 w-96 flex-col items-center justify-evenly rounded px-16 text-xl`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className={`text-center`}>Enter file name</h1>
        <input
          ref={ref}
          type="text"
          className={`${currentTheme.bg1} h-1/4 px-4 w-full outline-none`}
        />
        <div className={`flex w-full items-center justify-between`}>
          <button
            className={`${currentTheme.hover} rounded px-2 py-1 text-main-color`}
            onClick={(e) => {
              e.stopPropagation();
              if (ref.current && ref.current.value !== "") {
                setItems(ref.current.value);
                setIsModalOpen();
              }
            }}
          >
            Create
          </button>
          <button
            className={`${currentTheme.hover} rounded px-2 py-1`}
            onClick={() => {
              setIsModalOpen();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
