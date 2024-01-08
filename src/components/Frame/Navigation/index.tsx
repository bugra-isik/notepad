import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import { VscBook, VscDesktopDownload, VscEdit } from "react-icons/vsc";
import Tabs from "./Tabs";
import { RefObject, useCallback, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

export default function Navigation({
  mdRef,
}: {
  mdRef: RefObject<HTMLElement>;
}) {
  const { sourceMode, setSourceMode, currentPage } = useStore(editorStore);

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
    <nav
      className={`relative z-50 flex max-h-8 min-h-8 w-full items-end bg-c1 text-c3`}
    >
      <Tabs />
      <button
        className={`bg-bg0 flex h-full items-center gap-4 bg-c2 px-8 py-1`}
      >
        <i className={``} onClick={handlePrint}>
          <VscDesktopDownload />
        </i>
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
