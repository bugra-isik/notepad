import { useStore } from "zustand";
import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import { db } from "@/db";
import { useCallback, useEffect } from "react";
import { VscClose, VscBook, VscEdit } from "react-icons/vsc";

export default function Nav() {
  const { currentTheme } = useStore(themeStore);
  const {
    currentPage,
    setCurrentPage,
    sourceMode,
    setSourceMode,
    tabs,
    setTabs,
    setContent,
  } = useStore(editorStore);
  const { bg1, bg2, hover, text } = currentTheme;

  const getData = useCallback(
    async (currentTab: string) => {
      setContent("");
      const data = await db.myData.get(currentTab);
      data && setContent(data.content ?? "");
    },
    [setContent],
  );

  useEffect(() => {
    setCurrentPage(tabs[0]);
    tabs.length !== 0 && getData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDataAtStartup = async () => {
      const data = await db.myData.get(tabs[0]);
      data && setContent(data.content ?? "sadas");
    };
    getDataAtStartup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const TabList = () => (
    <ul className={`flex h-full w-full  items-end gap-px overflow-x-scroll`}>
      {tabs.map((item, index) => {
        const isCurrentPage = item === currentPage;
        return (
          <li
            key={index}
            className={`${
              isCurrentPage ? bg2 : bg1
            } ${hover} flex h-4/5 w-40 flex-shrink-0 cursor-pointer select-none items-end justify-between truncate rounded-t-lg px-5 transition focus:bg-black`}
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
              className={`hidden text-xl`}
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
              <VscClose />
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className={`${bg1} ${text}  relative z-50 flex h-8 w-full items-end`}>
      <button className={`px-8 py-1 text-2xl`} onClick={() => setSourceMode()}>
        {sourceMode ? (
          <VscBook title="Current mode: Edit, click to read" />
        ) : (
          <VscEdit title="Current mode: Read, click to edit" />
        )}
      </button>
      <TabList />
    </nav>
  );
}
