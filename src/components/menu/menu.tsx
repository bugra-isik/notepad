import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Theme from "./theme";
import { themeStore } from "@/stores/themeStore";
import { db } from "@/db";

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

  const deleteTable = async () => await db.myData.clear();

  return (
    <section
      className={`${translateX} absolute inset-y-0 right-0 z-50 flex w-1/5 items-center bg-black/75 backdrop-blur transition duration-500 ease-out`}
    >
      <button
        className={`bg-main-color absolute -left-5 h-40 w-5 rounded-l-lg drop-shadow-2xl backdrop-blur`}
        onClick={() =>
          setTranslateX((e) =>
            e == "translate-x-full" ? "translate-x-0" : "translate-x-full",
          )
        }
      />
      <Theme />
      <button
        className={`bg-red-900 h-20 w-40`}
        onClick={() => deleteTable()}
      >
        Delete All Data
      </button>
    </section>
  );
}
