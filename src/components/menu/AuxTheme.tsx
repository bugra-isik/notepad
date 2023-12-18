import { themeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function AuxTheme() {
  const { setAuxTheme } = useStore(themeStore);

  useEffect(() => {
    const local = localStorage.getItem("AuxTheme");
    if (local != null) {
      setAuxTheme(local);
    }
  }, [setAuxTheme]);

  const colors = [
    "#8a5cf5",
    "#608a5c",
    "#FFC7C7",
    "#f6f6f6",
    "#222831",
    "#00adb5",
    "#3f72af",
    "#6a2c70",
    "#b83b5e",
    "#f08a5d",
    "#f9ed69",
    "#08d9d6",
    "#f38181",
    "#a8d8ea",
    "#9e7676",
  ];

  return (
    <div className={`h1 flex w-4/5 flex-col gap-y-4`}>
      <h1 className={`text-center`}>Secondary theme</h1>
      <div className={`grid grid-cols-5 place-items-center gap-5`}>
        {colors.map((i, index) => (
          <button
            key={index}
            className={`h-4 w-4 rounded-full`}
            onClick={() => {
              setAuxTheme(i);
              localStorage.setItem("AuxTheme", i);
              const root = document.documentElement;
              root.style.setProperty("--dynamicColor", i);
            }}
            style={{ backgroundColor: i }}
          />
        ))}
      </div>
    </div>
  );
}
