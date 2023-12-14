import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import { utilityStore } from "@/stores/utiltyStore";
import { RefObject } from "react";
import { useStore } from "zustand";

export default function NewTab({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) {
  const { currentTheme } = useStore(themeStore);
  const { setCreateModal } = useStore(utilityStore);

  return (
    <section
      className={`${currentTheme.color1} flex basis-4/5 items-center justify-center`}
    >
      <button
        className={`text-4xl`}
        onClick={() => {
          // titleRef.current && (titleRef.current.value = "");
          // titleRef.current?.focus();
          setCreateModal();
        }}
      >
        Create a new file
      </button>
    </section>
  );
}
