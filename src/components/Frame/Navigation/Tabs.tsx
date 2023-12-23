import { useStore } from "zustand";
import { editorStore } from "@/Stores/EditorStore";
import { db } from "@/db";
import { useCallback, useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { themeStore } from "@/Stores/ThemeStore";

export default function Tabs() {
  const { currentTheme } = useStore(themeStore);
  const { currentPage, setCurrentPage, tabs, setTabs, setContent } =
    useStore(editorStore);
  const { bg2, hover } = currentTheme;
  const [dragStart, setDragStart] = useState<number>(0);

  useEffect(() => {
    const getDataAtStartup = async () => {
      const data = await db.myData.get("Tabs Array");
      if (data && data?.tabs && data?.tabs?.length !== 0) {
        await db.myData
          .get(data?.tabs[0])
          .then((e) => setContent(e?.content ?? ""));
      }
    };
    getDataAtStartup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = useCallback(
    async (currentTab: string) => {
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

  const switchTabs = useCallback(
    (arg1: number) => {
      const newArr = tabs.map((item, index) => {
        if (index === arg1) {
          return tabs[dragStart];
        }
        if (index === dragStart) {
          return tabs[arg1];
        } else {
          return item;
        }
      });

      setTabs(newArr);
    },
    [dragStart, setTabs, tabs],
  );

  return (
    <ul className={`flex h-full w-full items-end gap-px overflow-x-scroll`}>
      {tabs.map((item, index) => {
        const isCurrentPage = item === currentPage;
        return (
          <li
            key={index}
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDragStart={() => setDragStart(index)}
            onDrop={() => {
              switchTabs(index);
            }}
            className={`${
              isCurrentPage && bg2
            } ${hover} flex h-4/5 w-40 flex-shrink-0 cursor-pointer select-none items-end justify-between truncate rounded-t-lg px-5 focus:bg-black pb-1`}
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
}
