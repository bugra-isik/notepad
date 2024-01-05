import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { motion } from "framer-motion";
import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import { RefObject, useCallback, useEffect } from "react";
import { db } from "@/db";

export default function MarkdownArea({
  mdRef,
}: {
  mdRef: RefObject<HTMLElement>;
}) {
  const { content, currentPage } = useStore(editorStore);

  useEffect(() => {
    const readScroll = async () => {
      await db.myData
        .get(currentPage)
        .then(
          (e) =>
            e?.scroll &&
            mdRef.current?.scroll(
              0,
              Number(
                e.scroll *
                  (mdRef.current?.scrollHeight - mdRef.current?.clientHeight),
              ),
            ),
        );
    };
    readScroll();
  }, [currentPage, mdRef]);

  const writeScroll = useCallback(
    async (e: React.UIEvent<HTMLSpanElement, UIEvent>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      await db.myData.update(currentPage, { scroll: scrollRatio });
    },
    [currentPage],
  );

  return (
    <motion.span
      ref={mdRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`h-full w-4/5 overflow-y-scroll pr-10`}
      onScroll={(e) => writeScroll(e)}
    >
      <Markdown
        className={`markdown zartzurt flex flex-col whitespace-pre-line pb-80 text-c3`}
        children={content}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // @ts-expect-error SyntaxHighlighter
              <SyntaxHighlighter
              wrapLines              
                {...rest}
                // showLineNumbers
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={stackoverflowDark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </motion.span>
  );
}
