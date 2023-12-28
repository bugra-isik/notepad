import { themeStore } from "@/Stores/ThemeStore";
import { useStore } from "zustand";
import Items from "./Items";
import Search from "./Search";

export default function Explorer() {
  const { currentTheme } = useStore(themeStore);

  return (
    <section
      className={`${currentTheme.bg1} ${currentTheme.text} relative gap-8 flex w-1/5 flex-col justify-between px-4 py-8`}
    >
      <Items />
      <Search />
    </section>
  );
}
