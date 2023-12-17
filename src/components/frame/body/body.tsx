import { RefObject } from "react";
import { useStore } from "zustand";
import NewTab from "./newTab/newTab";
import Textarea from "./textarea/textarea";
import MarkdownArea from "./markdownArea/MarkdownArea";
import { editorStore } from "@/stores/editorStore";

export default function Body({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { sourceMode, currentPage } = useStore(editorStore);

  return (
    <section
      id="frame"
      className={`relative flex w-4/5 grow flex-col items-center drop-shadow-lg overflow-scroll`}
    >
      {currentPage == undefined ? (
        <NewTab titleRef={titleRef} />
      ) : sourceMode ? (
        <Textarea />
      ) : (
        <MarkdownArea />
      )}
    </section>
  );
}
