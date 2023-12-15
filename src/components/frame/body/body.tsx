import { RefObject, useEffect } from "react";
import { useStore } from "zustand";
import NewTab from "./newTab/newTab";
import Textarea from "./textarea/textarea";
import MarkdownArea from "./markdownArea/markdownArea";
import { editorStore } from "@/stores/editorStore";

export default function Body({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { sourceMode, currentPage, setCurrentPage, tabs, setTabs } =
    useStore(editorStore);

  // useEffect(() => {
  //   window.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter" && titleRef.current) {
  //       const copyTabs = [...tabs];
  //       setCurrentPage(titleRef.current?.value);
  //       titleRef.current.blur();
  //       const index = copyTabs.indexOf(currentPage);
  //       if (index !== -1) {
  //         copyTabs[index] = titleRef.current?.value;
  //         setTabs(copyTabs);
  //       }
  //     }
  //   });
  // }, [setCurrentPage, tabs, setTabs, currentPage, titleRef]);

  return (
    <section
      id="frame"
      className={`relative flex w-4/5 grow flex-col items-center drop-shadow-lg`}
    >
      {currentPage == undefined ? (
        <NewTab titleRef={titleRef} />
      ) : sourceMode ? (
        <Textarea />
      ) : (
        //<MarkdownArea />
        <div></div>
      )}
    </section>
  );
}
