import { useStore } from "zustand";
import { useEffect } from "react";
import { themeStore } from "@/stores/themeStore";

export default function Theme() {
  const { setCurrentTheme } = useStore(themeStore);

  useEffect(() => {
    const local = localStorage.getItem("notePadTheme") as
      | "theme1"
      | "theme2"
      | "theme3";
    if (local != null) {
      setCurrentTheme(local);
    }
  }, [setCurrentTheme]);

  const themes = ["theme1", "theme2", "theme3"];

  return (
    <div className={`h1 flex w-4/5 flex-col gap-y-4 items-center`}>
      <h1 className={`h1`}>Main theme</h1>
      <div className="flex gap-5 w-full justify-between">
        {["#262626", "#f6f6f6", "#181c20"].map((color, index) => (
          <button
            key={index}
            className={`bg-[${color}] h-4 w-4 rounded-full`}
            onClick={() => {
              const theme = themes[index] as "theme1" | "theme2" | "theme3";
              setCurrentTheme(theme);
              localStorage.setItem("notePadTheme", theme);
            }}
          />
        ))}
      </div>
    </div>
  );
}
