import { useStore } from "zustand";
import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import { db } from "@/db";
import { useCallback, useEffect } from "react";

export default function Nav() {
  const { currentTheme } = useStore(themeStore);
  const {
    currentPage,
    setCurrentPage,
    setSourceMode,
    tabs,
    setTabs,
    setContent,
  } = useStore(editorStore);
  const { bg1, bg2, hover, text } = currentTheme;

  const getData = useCallback(
    async (currentTab: string) =>
      tabs.length !== 0 &&
      (await db.myData
        .get(currentTab)
        .then((e) => setContent(e?.content ?? ""))
        .catch((e) => console.log(e))),
    [setContent, tabs.length],
  );

  useEffect(() => {
    setCurrentPage(tabs[0]);
    tabs.length !== 0 && getData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getData = async () => {
      await db.myData
        .get(tabs[0])
        .then((e) => setContent(e?.content ?? ""))
        .catch((e) => console.error("Error" + e));
    };
    tabs.length !== 0 && getData();
  }, [tabs, setContent]);

  useEffect(() => {
    const getTabs = async () => {
      await db.myData.get("Tabs Array").then((e) => {
        if (e?.tabs?.length !== 0) {
          setTabs(e?.tabs ?? []);
          e?.tabs && setCurrentPage(e?.tabs[0]);
        }
      });
    };
    getTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const putTabs = async () => {
      await db.myData.put({
        title: "Tabs Array",
        tabs: tabs,
      });
    };
    putTabs();
  }, [tabs]);

  

  const TabList = () =>
    tabs.map((item, index) => {
      const isCurrentPage = item === currentPage;
      return (
        <li
          key={index}
          className={`${
            isCurrentPage ? bg2 : bg1
          } ${hover} flex h-4/5 w-40 cursor-pointer select-none items-center justify-between truncate rounded-t-lg px-5 transition focus:bg-black`}
          onClick={() => {
            setCurrentPage(item);
            tabs.length !== 0 && getData(item);
          }}
          onMouseEnter={(e) =>
            e.currentTarget.children[1].classList.remove("hidden")
          }
          onMouseLeave={(e) =>
            e.currentTarget.children[1].classList.add("hidden")
          }
        >
          <p className={`w-4/5 truncate`}>{item}</p>
          <button
            className={`hidden`}
            onClick={(e) => {
              e.stopPropagation();
              setContent("");
              setCurrentPage(index === 0 ? tabs[1] : tabs[index - 1]);
              setTabs(tabs.filter((e) => e !== item));
              if (tabs.length > 1) {
                getData(index === 0 ? tabs[1] : tabs[index - 1]);
              }
            }}
          >
            X
          </button>
        </li>
      );
    });

  return (
    <nav
      className={`${bg1} ${text} relative z-50 flex h-10 w-full items-center justify-between px-10`}
    >
      <ul className={`flex h-full items-end gap-px`}>
        <TabList />
        <li>
          <button
            className={`ml-5 self-center text-4xl`}
            onClick={() => {
              tabs[tabs.length - 1] !== "New tab" &&
                setTabs([...tabs, "New tab"]);
              setCurrentPage("New tab");
              setContent("");
            }}
          >
            +
          </button>
        </li>
      </ul>
      <button
        className={`absolute right-20 h-full w-10 cursor-pointer bg-blue-400`}
      />
      <button
        className={`absolute right-0 h-full w-10 cursor-pointer bg-red-400`}
        onClick={() => setSourceMode()}
      />
    </nav>
  );
}
