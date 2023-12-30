import { themeStore } from "@/Stores/ThemeStore";
import { Data, db } from "@/db";
// import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { useLiveQuery } from "dexie-react-hooks";
import { VscSearch } from "react-icons/vsc";
import { editorStore } from "@/Stores/EditorStore";

export default function CreateItem() {
  const { setSearchModal } = useStore(utilityStore);
  const { currentTheme } = useStore(themeStore);
  const { setSearchedItem } = useStore(editorStore);
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<Data[]>();
  // const { items, setItems } = useStore(editorStore);
  const ref = useRef<HTMLInputElement>(null);
  const { bg1, bg2, text, hover, border } = currentTheme;

  const query = useLiveQuery(
    () => db.myData.where("content").startsWithIgnoreCase(inputValue).toArray(),
    [inputValue],
  );

  useEffect(() => {
    inputValue.length > 2 && setResults(query);
    return () => setResults([]);
  }, [inputValue.length, query]);

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] bg-black/75`}
      onClick={() => {
        setSearchModal();
      }}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div
        className={`${bg2} ${text} ${border} absolute right-0 flex h-full w-96 flex-col items-center border-l px-16 text-xl`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`flex min-h-16 w-full items-center justify-evenly gap-4`}
        >
          <VscSearch />
          <input
            ref={ref}
            type="text"
            placeholder="Type to search..."
            autoFocus
            className={`${bg1} ${hover} h-8 w-full rounded px-4 outline-none transition placeholder:text-base`}
            onChange={(e) => {
              setInputValue(String(e.currentTarget.value));
            }}
          />
        </div>
        <div
          className={`flex w-full grow flex-col gap-4 overflow-y-scroll transition`}
        >
          {results?.map((e) => (
            <AnimatePresence key={e.title}>
              <motion.button
                className={`${bg1} ${border} flex min-h-fit w-full flex-col justify-between border p-4 `}
                onClick={() => {
                  setSearchedItem(e.title);
                  setSearchModal();
                }}
              >
                <div className={`text-base`}>{e.title}</div>
              </motion.button>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
