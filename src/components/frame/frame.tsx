import { useStore } from "zustand";
import Nav from "./nav/nav";
import Body from "./body/body";
import { useRef } from "react";
import Headline from "./headline/headline";
import { themeStore } from "@/stores/themeStore";
export default function Frame() {
  const { currentTheme } = useStore(themeStore);
  const titleRef = useRef<HTMLInputElement>(null);
  const { bg2, text } = currentTheme;

  return (
    <section
      className={`${bg2} ${text} relative flex w-4/5 flex-col items-center`}
    >
      <Nav />
      <Headline titleRef={titleRef} />
      <Body titleRef={titleRef} />
    </section>
  );
}
