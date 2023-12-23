import { useStore } from "zustand";
import Navigation from "./Navigation";
import Body from "./Body";
import { themeStore } from "@/Stores/ThemeStore";

export default function Frame() {
  const { currentTheme } = useStore(themeStore);
  const { bg2, text } = currentTheme;

  return (
    <section
      className={`${bg2} ${text} relative flex w-4/5 flex-col items-center`}
    >
      <Navigation />
      <Body />
    </section>
  );
}
