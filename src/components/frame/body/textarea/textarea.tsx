import { db } from "@/db";
import { editorStore } from "@/stores/editorStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function Textarea() {
  const { content, setContent, currentPage } = useStore(editorStore);

  useEffect(() => {
    const getData = async (currentTab: string) => {
      await db.myData
        .get(currentTab)
        .then((e) => {
          e && setContent(e.content);
        })
        .catch((e) => console.log(e));
    };
    getData(currentPage);
  }, [currentPage, setContent]);

  const addData = async (content: string) => {
    await db.myData.put({
      title: currentPage,
      content: content,
    });
  };
  console.log(content);
  return (
    <motion.textarea
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="content"
      value={content}
      className={`flex h-full w-4/5 resize-none whitespace-pre-wrap bg-transparent pb-80 pr-10 pt-20 focus:outline-none`}
      onChange={(e) => {
        setContent(e.currentTarget.value);
        addData(e.currentTarget.value);
      }}
    />
  );
}
