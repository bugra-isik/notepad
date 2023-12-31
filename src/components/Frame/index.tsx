import { useStore } from "zustand";
import Navigation from "./Navigation";
import Body from "./Body";
import { themeStore } from "@/Stores/ThemeStore";
import { RefObject, useRef } from "react";

export default function Frame() {
  const { currentTheme } = useStore(themeStore);
  const { bg2, text } = currentTheme;
  const mdRef: RefObject<HTMLElement> = useRef(null);

  return (
    <section
      className={`${bg2} ${text} relative flex w-4/5 flex-col items-center`}
    >
      <Navigation mdRef={mdRef} />
      <Body mdRef={mdRef} />
    </section>
  );
}
