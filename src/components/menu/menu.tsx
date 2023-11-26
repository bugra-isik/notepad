import { useStore } from "zustand";
import { themeStore } from "../../stores/themeStore";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Theme from "./theme";

export default function Menu() {
  const { currentTheme } = useStore(themeStore);
  const [translateX, setTranslateX] = useState<string>("translate-x-full");
  const { width } = useWindowSize();
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
      className={`${translateX} absolute inset-y-0 right-0 z-50 flex w-1/5 items-center bg-black/75 backdrop-blur transition duration-500 ease-out`}
    >
      <button
        className={`absolute -left-5 h-40 w-5 rounded-l-lg bg-[#8a5cf5] drop-shadow-2xl backdrop-blur`}
        onClick={() =>
          setTranslateX((e) =>
            e == "translate-x-full" ? "translate-x-0" : "translate-x-full",
          )
        }
      />
      <Theme />
    </section>
  );
}
