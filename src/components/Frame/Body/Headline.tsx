import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { AiFillCopy } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Headline() {
  const { currentPage, tabs } = useStore(editorStore);
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopyButton, setIsCopyButton] = useState<boolean>(false);

  const handle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    copyToClipboard(e.currentTarget.innerHTML);
    setIsCopyButton(true);
    setTimeout(() => {
      setIsCopyButton(false);
    }, 500);
  };

  return (
    <section className={`flex w-4/5 justify-center py-3`}>
      <div
        className={`relative flex cursor-copy items-center  bg-transparent text-center focus:outline-none`}
        onClick={(e) => handle(e)}
      >
        {tabs.length == 0 ? "about:blank" : currentPage}
        {isCopyButton && (
          <AnimatePresence>
            <motion.i
              animate={{ opacity: [0, 1] }}
              exit={{ opacity: 0 }}
              className={`absolute left-full ml-4`}
            >
              <AiFillCopy />
            </motion.i>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
