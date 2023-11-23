import { useStore } from "zustand";
import { themeStore } from "../../stores/themeStore";
import Items from "./items";

export default function SideBar() {
  const { currentTheme } = useStore(themeStore);

  return (
    <section
      className={`${currentTheme.bg1} ${currentTheme.text} w-1/5 overflow-y-scroll p-4 drop-shadow-lg`}
    >
      <Items />
    </section>
  );
}
