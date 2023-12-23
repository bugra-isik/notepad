import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import { VscBook, VscEdit } from "react-icons/vsc";
import { themeStore } from "@/Stores/ThemeStore";
import Tabs from "./Tabs";
import { useEffect } from "react";

export default function Navigation() {
  const { currentTheme } = useStore(themeStore);
  const { sourceMode, setSourceMode } = useStore(editorStore);
  const { bg1, text } = currentTheme;

  useEffect(() => {
    const first = localStorage.getItem("CheckFirstTime");
    !first && setSourceMode(true);
  }, [setSourceMode]);

  return (
    <nav className={`${bg1} ${text} relative z-50 flex h-8 w-full items-end`}>
      <button className={`px-8 py-1 text-2xl`}>
        {sourceMode ? (
          <VscBook
            title="Current mode: Edit, click to read"
            onClick={() => setSourceMode(false)}
          />
        ) : (
          <VscEdit
            title="Current mode: Read, click to edit"
            onClick={() => setSourceMode(true)}
          />
        )}
      </button>
      <Tabs />
    </nav>
  );
}
