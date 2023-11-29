import { editorStore } from "@/stores/editorStore";
import { guide } from "@/stores/guide";
import { motion } from "framer-motion";
import { useStore } from "zustand";

export default function Textarea() {
  const { content, setContent,currentPage } = useStore(editorStore);

  console.log(currentPage)
  
  return (
    <motion.textarea
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="content"
      value={currentPage=="Guide"?guide:content[currentPage]}
      className={`flex h-full w-4/5 resize-none whitespace-pre-wrap bg-transparent pb-80 pr-10 pt-20 focus:outline-none`}
      onChange={(e) => setContent(e.currentTarget.value)}
    />
  );
}
