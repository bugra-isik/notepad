import { useEffect, useState } from "react";
import { useWindowSize, useHover } from "@uidotdev/usehooks";
import Themes from "./Themes";
import Fonts from "./Fonts";
import Delete from "./Delete";
import AuxTheme from "./AuxTheme";
import { useStore } from "zustand";
import { themeStore } from "@/stores/themeStore";

export default function Menu() {
  const [translateX, setTranslateX] = useState<string>("translate-x-full");
  const { auxTheme } = useStore(themeStore);
  const { width } = useWindowSize();
  const [ref, hovering] = useHover();

  useEffect(() => {
    if (width) {
      let startX: number, endX: number;
      window.addEventListener("mousedown", (e) => {
        startX = e.clientX;
      });
      window.addEventListener("mouseup", (e) => {
        endX = e.clientX;
        if (endX - startX > width / 5) {
          setTranslateX("translate-x-full");
        }
      });
    }
  }, [translateX, width]);

  return (
    <section
      className={`${translateX} absolute inset-y-0 right-0 z-50 flex w-1/5 select-none items-center justify-center bg-black/75 backdrop-blur transition duration-500 ease-out`}
    >
      <button
        ref={ref}
        className={`absolute right-full h-80 w-5 rounded-l-lg bg-main-color drop-shadow-2xl transition`}
        onClick={() =>
          setTranslateX((e) =>
            e == "translate-x-full" ? "translate-x-0" : "translate-x-full",
          )
        }
        style={{
          backgroundColor: auxTheme,
          opacity: hovering ? 1 : 0.5,
        }}
      />
      <div
        className={`flex h-full w-full flex-col items-center justify-between self-start`}
      >
        <Themes />
        <Fonts />
        <AuxTheme />
        <Delete />
      </div>
    </section>
  );
}
