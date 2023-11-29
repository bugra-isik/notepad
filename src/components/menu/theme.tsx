import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { themeStore } from "@/stores/themeStore";

export default function Theme() {
  const { currentTheme, setCurrentTheme } = useStore(themeStore);

  useEffect(() => {
    const local = localStorage.getItem("notePadTheme");
    if (local != null) {
      setCurrentTheme(local);
    }
  }, [setCurrentTheme]);

  // useEffect(() => {
  //   localStorage.setItem("notePadTheme", currentTheme.id);
  // }, [currentTheme.id]);

  return (
    <div className="self-start">
      <h1>Themes</h1>
      <div className="grid grid-cols-2 gap-5">
        {["#262626", "#f6f6f6", "#181c20"].map((color, index) => (
          <button
            key={index}
            className={`bg-[${color}] h-4 w-4 rounded-full`}
            onClick={() => {
              const theme = `theme${index + 1}`;
              setCurrentTheme(theme);
              localStorage.setItem("notePadTheme", theme);
            }}
          />
        ))}
      </div>
    </div>
  );
}
