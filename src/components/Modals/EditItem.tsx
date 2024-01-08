import { themeStore } from "@/Stores/ThemeStore";
import { db } from "@/db";
import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useStore } from "zustand";
import ModalAlert from "./ModalAlert";

export default function EditItem() {
  const { setEditModal, setAlertModal, alertModal } = useStore(utilityStore);
  const { auxTheme } = useStore(themeStore);
  const {
    items,
    setItems,
    currentItem,
    tabs,
    setTabs,
    setCurrentPage,
    setContent,
  } = useStore(editorStore);
  const [toggle, setToggle] = useState<number>(1);
  const ref = useRef<HTMLInputElement>(null);

  const renameData = useCallback(
    async (title: string) => {
      await db.myData.update(currentItem, { title: title });
    },
    [currentItem],
  );

  const deleteData = useCallback(async (title: string) => {
    await db.myData.delete(title);
  }, []);

  const alertHandler = () => {
    setAlertModal();
    setTimeout(() => {
      setAlertModal();
    }, 2000);
  };

  const CurrentToggle = ({ value }: { value: number }) => {
    switch (true) {
      case value === 1:
        return (
          <div
            className={`flex h-48 w-96 flex-col items-center justify-between rounded-lg bg-c2 px-16 py-4 text-xl`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={`grid w-2/3 grid-cols-2 place-items-center gap-4`}>
              <button className={`font-black`} onClick={() => setToggle(1)}>
                Rename
              </button>
              <button className={``} onClick={() => setToggle(2)}>
                Delete
              </button>
            </div>
            <input
              ref={ref}
              type="text"
              autoFocus
              className={`h-1/4  w-full rounded bg-c2 px-4 outline-none transition`}
            />
            <div className={`flex w-full items-center justify-between`}>
              <button
                className={` rounded px-2 py-1 text-main-color`}
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
                    setItems(
                      items.map((item) => {
                        if (item === currentItem && ref.current) {
                          return ref.current.value;
                        }
                        return item;
                      }),
                    );
                    setTabs(
                      tabs.map((item) => {
                        if (item === currentItem && ref.current) {
                          return ref.current.value;
                        }
                        return item;
                      }),
                    );
                    setCurrentPage(ref.current.value);
                    setEditModal();
                    renameData(ref.current.value);
                  }
                }}
                style={{ color: auxTheme }}
              >
                Confirm
              </button>
              <button
                className={` rounded px-2 py-1`}
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
            className={`flex h-48 w-96 flex-col items-center justify-between rounded-lg bg-c2 px-16 py-4 text-xl text-c4`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={`grid w-2/3 grid-cols-2 place-items-center gap-4`}>
              <button className={``} onClick={() => setToggle(1)}>
                Rename
              </button>
              <button className={`font-black`} onClick={() => setToggle(2)}>
                Delete
              </button>
            </div>
            <div className={`flex w-full items-center justify-between`}>
              <button
                className={` rounded px-2 py-1 text-main-color`}
                onClick={() => {
                  deleteData(currentItem);
                  setItems(items.filter((e) => e !== currentItem));
                  setTabs(tabs.filter((e) => e !== currentItem));
                  setContent("");
                  setEditModal();
                }}
                style={{ color: auxTheme }}
              >
                Delete
              </button>
              <button
                className={` rounded px-2 py-1`}
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
      className={`absolute inset-0 z-[999] grid place-items-center bg-black/50 text-c3 backdrop-blur-sm`}
      onClick={() => {
        setEditModal();
      }}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <AnimatePresence>{alertModal && <ModalAlert />}</AnimatePresence>
      <CurrentToggle value={toggle} />
    </motion.div>
  );
}
