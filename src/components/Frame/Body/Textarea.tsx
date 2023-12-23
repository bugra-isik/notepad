import { themeStore } from "@/Stores/ThemeStore";
import { db } from "@/db";
import { editorStore } from "@/Stores/EditorStore";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useStore } from "zustand";

export default function Textarea() {
  const { content, setContent, currentPage } = useStore(editorStore);
  const { currentTheme } = useStore(themeStore);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const getData = async (currentTab: string) => {
      await db.myData
        .get(currentTab)
        .then((e) => {
          e && setContent(e.content ?? "");
        })
        .catch((e) => console.log(e));
    };
    getData(currentPage);
  }, [currentPage, setContent]);

  useEffect(() => {
    const readScroll = async () => {
      await db.myData
        .get(currentPage)
        .then(
          (e) =>
            e?.scroll &&
            textRef.current?.scroll(
              0,
              Number(
                e.scroll *
                  (textRef.current?.scrollHeight -
                    textRef.current?.clientHeight),
              ),
            ),
        );
    };
    readScroll();
  }, [currentPage]);

  const addData = useCallback(
    async (content: string) => {
      await db.myData.put({
        title: currentPage,
        content: content,
      });
    },
    [currentPage],
  );

  const writeScroll = useCallback(
    async (e: React.UIEvent<HTMLSpanElement, UIEvent>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      await db.myData.update(currentPage, { scroll: scrollRatio });
    },
    [currentPage],
  );

  const checkFirstTime = useCallback(async () => {
    localStorage.setItem("CheckFirstTime", "OK");
  }, []);

  return (
    <motion.textarea
      ref={textRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="content"
      value={content}
      placeholder={
        localStorage.getItem("CheckFirstTime")
          ? ""
          : "Embrace the blank page, let your thoughts dance..."
      }
      className={`${currentTheme.bg1} flex h-full w-4/5 resize-none pb-80 pr-10 pt-20 focus:outline-none`}
      onChange={(e) => {
        setContent(e.currentTarget.value);
        addData(e.currentTarget.value);
      }}
      onScroll={(e) => writeScroll(e)}
      onBlur={() => checkFirstTime()}
    />
  );
}
