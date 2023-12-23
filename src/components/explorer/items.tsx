import { useStore } from "zustand";
import { useCallback, useEffect, useState } from "react";
import { VscEdit, VscAdd } from "react-icons/vsc";
import { db } from "@/db";
import { themeStore } from "@/Stores/ThemeStore";
import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";

export default function Items() {
  const { currentTheme, auxTheme } = useStore(themeStore);
  const {
    items,
    setItems,
    setCurrentItem,
    tabs,
    setTabs,
    setCurrentPage,
    setContent,
  } = useStore(editorStore);
  const { setEditModal, setCreateModal } = useStore(utilityStore);
  const { hover, bg2 } = currentTheme;
  const [dragStart, setDragStart] = useState<number>(0);

  

  const getData = useCallback(
    async (currentTab: string) => {
      const data = await db.myData.get(currentTab);
      data && setContent(data.content ?? "");
    },
    [setContent],
  );

  useEffect(() => {
    const getItems = async () => {
      await db.myData.get("Items Array").then((e) => {
        if (e?.items?.length && e.items.length > 0) {
          setItems(e?.items);
        }
      });
    };
    getItems();
  }, [setItems]);

  useEffect(() => {
    const putItems = async () => {
      await db.myData.put({
        title: "Items Array",
        items: items,
      });
    };
    putItems();
  }, [items]);  

  const switchItems = useCallback(
    (arg1: number) => {
      const newArr = items.map((item, index) => {
        if (index === arg1) {
          return items[dragStart];
        }
        if (index === dragStart) {
          return items[arg1];
        } else {
          return item;
        }
      });

      setItems(newArr);
    },
    [dragStart, items, setItems],
  );

  return (
    <div className={`mb-4 grid grid-cols-1 gap-y-2`}>
      {items.map((item, index) => (
        <button
          key={index}
          draggable
          onDragOver={(e) => e.preventDefault()}
          onDragStart={() => setDragStart(index)}
          onDrop={() => {
            switchItems(index);
          }}
          className={`${hover} ${bg2} relative flex h-8 w-full items-center justify-between rounded px-4 text-start drop-shadow-lg`}
          onClick={() => {
            getData(item);
            setCurrentItem(item);
            !tabs.includes(item) && setTabs([...tabs, item]);
            setCurrentPage(item);
          }}
          onMouseEnter={(e) =>
            e.currentTarget.children[1].classList.remove("hidden")
          }
          onMouseLeave={(e) =>
            e.currentTarget.children[1].classList.add("hidden")
          }
          style={{}}
        >
          <p className={`flex size-full items-center`}>{item}</p>
          <i
            className={`hidden text-lg`}
            onClick={(e) => {
              setCurrentItem(item);
              setEditModal();
              e.stopPropagation();
            }}
          >
            <VscEdit />
          </i>
        </button>
      ))}
      <button
        className={`${currentTheme.hover} flex h-8 w-full items-center justify-center rounded text-start transition`}
        onClick={() => setCreateModal()}
        style={{ color: auxTheme }}
      >
        <VscAdd />
      </button>
    </div>
  );
}
