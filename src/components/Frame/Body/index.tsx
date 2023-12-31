import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import NewFile from "./NewFile";
import Textarea from "./Textarea";
import MarkdownArea from "./MarkdownArea";
import Headline from "./Headline";
import { RefObject } from "react";

export default function Body({ mdRef }:{mdRef:RefObject<HTMLElement>}) {
  const { sourceMode, currentPage } = useStore(editorStore);

  return (
    <section
      id="frame"
      className={`relative flex w-4/5 grow flex-col items-center overflow-scroll drop-shadow-lg pb-8`}
    ><Headline />
      {currentPage === undefined ? (
        <NewFile />
      ) : sourceMode === true ? (
        <Textarea />
      ) : (
        <MarkdownArea mdRef={mdRef}/>
      )}
    </section>
  );
}
