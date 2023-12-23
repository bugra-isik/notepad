import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";

export default function Headline() {
  const { currentPage, tabs } = useStore(editorStore);

  return (
    <section className={`flex w-4/5 justify-center py-3`}>
      <div className={`bg-transparent text-center focus:outline-none`}>
        {tabs.length == 0 ? "about:blank" : currentPage}
      </div>
    </section>
  );
}
