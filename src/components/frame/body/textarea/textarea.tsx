import { motion } from "framer-motion";
import { useStore } from "zustand";
import { editorStore } from "../../../../stores/editorStore";

export default function Textarea() {
  const { content, setContent } = useStore(editorStore);

  return (
    <motion.textarea
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="content"
      value={content}
      className={`flex h-full w-4/5 resize-none whitespace-pre-wrap bg-transparent pb-80 pr-10 pt-20 focus:outline-none`}
      onChange={(e) => setContent(e.currentTarget.value)}
    />
  );
}
