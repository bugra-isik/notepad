import { themeStore } from "@/Stores/ThemeStore";
import { Data, db } from "@/db";
// import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { useLiveQuery } from "dexie-react-hooks";
import { VscSearch } from "react-icons/vsc";

export default function CreateItem() {
  const { setSearchModal } = useStore(utilityStore);
  const { currentTheme } = useStore(themeStore);
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<Data[]>();
  // const { items, setItems } = useStore(editorStore);
  const ref = useRef<HTMLInputElement>(null);
  const { bg1, bg2, text, hover } = currentTheme;

  const items = useLiveQuery(
    () => db.myData.where("content").startsWithIgnoreCase(inputValue).toArray(),
    [inputValue],
  );

  useEffect(() => {
    inputValue.length > 2 && setResults(items);
    return () => setResults([]);
  }, [inputValue.length, items]);

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
        className={`${bg2} ${text} absolute right-0 flex h-full w-96 flex-col items-center px-16 text-xl`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`flex min-h-16 items-center justify-evenly gap-4`}>
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
            <AnimatePresence>
              <motion.button key={e.title} className={`${bg1} h-12 w-full `}>
                {e.title}
                {/* {e.content} */}
              </motion.button>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
