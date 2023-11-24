import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { motion } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
import { useStore } from "zustand";
import { editorStore } from "../../../stores/editorStore";
import NewTab from "./newTab/newTab";

export default function Body({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { sourceMode, currentPage, setCurrentPage, tabs, setTabs } =
    useStore(editorStore);
  const [text, setText] = useState<string>();

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && titleRef.current) {
        const copyTabs = [...tabs];
        setCurrentPage(titleRef.current?.value);
        titleRef.current.blur();
        const index = copyTabs.indexOf(currentPage);
        if (index !== -1) {
          copyTabs[index] = titleRef.current?.value;
          setTabs(copyTabs);
        }
      }
    });
  }, [setCurrentPage, tabs, setTabs, currentPage, titleRef]);

  return (
    <section
      className={`relative flex h-full w-4/5 flex-col items-center drop-shadow-lg`}
    >
      {currentPage == "New tab" ? (
        <NewTab titleRef={titleRef} />
      ) : sourceMode ? (
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          id="content"
          value={text}
          className={`flex h-full w-4/5 resize-none whitespace-pre-wrap bg-transparent pb-80 pr-10 pt-20 focus:outline-none`}
          onChange={(e) => setText(e.currentTarget.value)}
        />
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-4/5 overflow-y-scroll pr-10`}
        >
          <Markdown
            className={`markdown flex flex-col pb-80 pt-20`}
            children={text}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  // @ts-expect-error SyntaxHighlighter
                  <SyntaxHighlighter
                    {...rest}
                    showLineNumbers
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
      )}
    </section>
  );
}
