import { Data, db } from "@/db";
// import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useStore } from "zustand";
import { useLiveQuery } from "dexie-react-hooks";
import { VscSearch } from "react-icons/vsc";
import { editorStore } from "@/Stores/EditorStore";
import { themeStore } from "@/Stores/ThemeStore";

export default function CreateItem() {
  const { setSearchModal } = useStore(utilityStore);
  const { auxTheme } = useStore(themeStore);
  const { setSearchedItem } = useStore(editorStore);
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<Data[]>();
  // const { items, setItems } = useStore(editorStore);
  const ref = useRef<HTMLInputElement>(null);

  useLiveQuery(
    () =>
      db.myData
        .toArray((e) => e.filter((e) => e.content))
        .then((e) => {
          const regEx = e.map((item) => ({
            ...item,
            content: item.content?.replace(/\s+/g, "").replace(/\n/g, ""),
          }));
          setResults(regEx);
        }),
    [inputValue],
  );

  const scrollToResult = (inputValue: string) => {
    const elements = document.querySelectorAll(".markdown *");
    elements.forEach((element) => {
      if (element.innerText.includes("import { Data, db }")) {
        const parentDiv = element.closest("div"); // Metnin içinde olduğu en yakın div elementini bul
        console.log(element); // Bu div elementini konsola yazdır
      }
    });
  };

  const Query = () => (
    <div
      className={`grid w-2/3 grid-cols-1 gap-4 overflow-y-scroll text-xs text-c3`}
    >
      {results
        ?.filter((e) => e.content?.includes(inputValue))
        .map((e, index) => (
          <motion.button
            key={index}
            className={`h-20 bg-c1 p-4 text-start hover:bg-c3/10`}
            onClick={() => {
              setSearchedItem(e.title);
              setSearchModal();
              scrollToResult(inputValue);
            }}
          >
            <div className={`text-base`} style={{ color: auxTheme }}>
              {e.title}
            </div>
            <div className={`truncate text-sm`}>{e.content}</div>
          </motion.button>
        ))}
    </div>
  );

  return (
    <motion.div
      transition={{ ease: "easeOut" }}
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className={`absolute inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm`}
      onClick={() => {
        setSearchModal();
      }}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div
        className={` flex h-2/3 w-1/2 flex-col items-center gap-y-4 rounded-lg bg-c2 py-8 text-xl text-c2`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`flex  min-h-16 w-2/3 items-center justify-evenly gap-4 border-b-2 border-c1 text-c3`}
        >
          <VscSearch />
          <input
            ref={ref}
            type="text"
            placeholder="Type to search..."
            autoFocus
            className={`h-8 w-full rounded bg-transparent px-4 text-c3 outline-none transition placeholder:text-base`}
            onChange={(e) => {
              setInputValue(String(e.currentTarget.value.split(" ").join("")));
            }}
          />
        </div>
        <AnimatePresence>
          <Query />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
