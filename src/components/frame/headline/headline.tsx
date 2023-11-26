import { useStore } from "zustand";
import { editorStore } from "../../../stores/editorStore";
import { RefObject } from "react";

export default function Headline({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { currentPage, setCurrentPage, tabs, setTabs } = useStore(editorStore);

  console.log(tabs.length);
  return (
    <section className={`flex w-full justify-center py-3`}>
      {
        (tabs.length == 0 ? (
          <div />
        ) : (
          <input
            ref={titleRef}
            placeholder="New tab"
            value={currentPage == "New tab" ? "" : currentPage}
            onChange={(e) => {
              setCurrentPage(e.target.value);
              const t = tabs;
              t[tabs.length - 1] = e.target.value;
              setTabs(t);
            }}
            className={`bg-transparent focus:outline-none`}
          />
        ))
      }
    </section>
  );
}
