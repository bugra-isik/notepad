import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { motion } from "framer-motion";
import { useStore } from "zustand";
import { editorStore } from "@/stores/editorStore";

export default function MarkdownArea() {
  const { content } = useStore(editorStore);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`h-full w-4/5 overflow-y-scroll pr-10`}
    >
      <Markdown
        className={`markdown flex flex-col pb-80`}
        children={content}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // @ts-expect-error SyntaxHighlighter
              <SyntaxHighlighter
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
