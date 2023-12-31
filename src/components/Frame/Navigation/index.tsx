import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import { VscBook, VscDesktopDownload, VscEdit } from "react-icons/vsc";
import { themeStore } from "@/Stores/ThemeStore";
import Tabs from "./Tabs";
import { RefObject, useCallback, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

export default function Navigation({
  mdRef,
}: {
  mdRef: RefObject<HTMLElement>;
}) {
  const { currentTheme } = useStore(themeStore);
  const { sourceMode, setSourceMode, currentPage } = useStore(editorStore);
  const { bg1, bg2, text } = currentTheme;

  useEffect(() => {
    const first = localStorage.getItem("CheckFirstTime");
    !first && setSourceMode(true);
  }, [setSourceMode]);

  const reactToPrintContent = useCallback(() => {
    return mdRef.current;
  }, [mdRef]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: currentPage,
    removeAfterPrint: true,
  });

  return (
    <nav className={`${bg1} ${text} relative z-50 flex h-8 w-full items-end`}>
      <Tabs />
      <button
        className={`${bg2} bg-bg0 flex h-full items-center gap-4 px-8 py-1`}
      >
        <button className={``} onClick={handlePrint}>
          <VscDesktopDownload />
        </button>
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
    </nav>
  );
}
