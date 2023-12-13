import { db } from "@/db";
import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import { utilityStore } from "@/stores/utiltyStore";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useStore } from "zustand";

export default function EditItem() {
  const { setEditModal } = useStore(utilityStore);
  const { currentTheme } = useStore(themeStore);
  const { items, setItems } = useStore(editorStore);
  const [toggle, setToggle] = useState<number>(1);
  const ref = useRef<HTMLInputElement>(null);

  const renameData = async (title: string) => {
    await db.myData.update("de", { title: title, content: "" });
  };

  const CurrentToggle = ({ value }: { value: number }) => {
    switch (true) {
      case value === 1:
        return (
          <div
            className={`${currentTheme.bg2} ${currentTheme.text} flex h-48 w-96 flex-col items-center justify-between rounded-3xl px-16 py-4 text-xl`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={`flex`}>
              <button
                className={`text-center text-red-500`}
                onClick={() => setToggle(1)}
              >
                Rename
              </button>
              <h1 className={`text-center`}>/</h1>
              <button className={`text-center`} onClick={() => setToggle(2)}>
                Delete
              </button>
            </div>
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
                  if (ref.current && ref.current.value !== "") {
                    renameData(ref.current.value);
                    setEditModal();
                  }
                }}
              >
                Confirm
              </button>
              <button
                className={`${currentTheme.hover} rounded px-2 py-1`}
                onClick={() => {
                  setEditModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        );

      case value === 2:
        return (
          <div
            className={`${currentTheme.bg2} ${currentTheme.text} flex h-48 w-96 flex-col items-center justify-between rounded-3xl px-16 py-4 text-xl`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={`flex`}>
              <button className={`text-center`} onClick={() => setToggle(1)}>
                Rename
              </button>
              <h1 className={`text-center`}>/</h1>
              <button
                className={`text-center text-red-500`}
                onClick={() => setToggle(2)}
              >
                Delete
              </button>
            </div>
            <div className={`flex w-full items-center justify-between`}>
              <button
                className={`${currentTheme.hover} rounded px-2 py-1 text-main-color`}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   if (ref.current && ref.current.value !== "") {
                //     setItems([...items, ref.current.value]);
                //     addData(ref.current.value);
                //     setCreateModal();
                //   }
                // }}
              >
                Delete
              </button>
              <button
                className={`${currentTheme.hover} rounded px-2 py-1`}
                onClick={() => {
                  setEditModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/75`}
      onClick={() => {
        setEditModal();
      }}
    >
      <CurrentToggle value={toggle} />
    </motion.div>
  );
}
