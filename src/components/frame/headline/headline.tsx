import { useStore } from "zustand";
import { RefObject } from "react";
import { editorStore } from "@/stores/editorStore";

export default function Headline({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { currentPage, tabs } = useStore(editorStore);

  return (
    <section className={`flex w-4/5 justify-center py-3`}>
      <div
        ref={titleRef}
        placeholder="New tab"
        className={`bg-transparent text-center focus:outline-none`}
      >
        {tabs.length == 0 ? "about:blank" : currentPage}
      </div>
    </section>
  );
}
