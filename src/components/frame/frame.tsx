import { useStore } from "zustand";
import { themeStore } from "../../stores/themeStore";
import Markdown from "react-markdown";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { motion } from "framer-motion";
import FrameNav from "./nav/nav";

const md = "## Alt Başlık";

export default function Frame() {
  const { currentTheme } = useStore(themeStore);
  const [sourceMode, setSourceMode] = useState(false);
  const [text, setText] = useState<string>(md);

  return (
    <section
      id="frame"
      className={`${currentTheme.bg2}  relative flex w-4/5 justify-center drop-shadow-lg`}
    >
      <FrameNav setSourceMode={setSourceMode} />
      {sourceMode ? (
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          id="content"
          value={text}
          className={`flex basis-4/5 resize-none whitespace-pre-wrap bg-transparent pt-20 focus:outline-none pb-40 pr-10`}
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
            className={`markdown flex flex-col pt-20 pb-40`}
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
