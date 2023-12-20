import { useStore } from "zustand";
import Items from "./items";
import { themeStore } from "@/stores/themeStore";

export default function Explorer() {
  const { currentTheme } = useStore(themeStore);

  return (
    <section
      className={`${currentTheme.bg1} ${currentTheme.text} relative w-1/5  px-4 pt-8`}
    >
      <div className={`h-full w-full overflow-y-scroll`}>
        <Items />
      </div>
    </section>
  );
}
