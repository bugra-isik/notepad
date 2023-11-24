import { useStore } from "zustand";
import { editorStore } from "../../../stores/editorStore";
import { RefObject } from "react";

export default function Headline({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { currentPage, setCurrentPage } = useStore(editorStore);
  return (
    <section className={`flex w-full justify-center py-3`}>
      <input
        ref={titleRef}
        placeholder="New Tab"
        value={currentPage == "New tab" ? undefined : currentPage}
        onChange={(e) => setCurrentPage(e.target.value)}
        className={`bg-transparent focus:outline-none`}
      />
    </section>
  );
}
