import { useStore } from "zustand";
import { Children, useCallback, useEffect } from "react";
import { themeStore } from "@/stores/themeStore";
import { editorStore } from "@/stores/editorStore";
import { VscEdit, VscAdd } from "react-icons/vsc";
import { db } from "@/db";
import { utilityStore } from "@/stores/utiltyStore";

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

  return (
    <div className={`mb-4 grid grid-cols-1 gap-y-2`}>
      {items.map((item, index) => (
        <button
          draggable
          onMouseOver={(e) =>
            e.currentTarget.children[
              e.currentTarget.children.length - 1
            ].classList.remove("hidden")
          }
          onMouseOut={(e) =>
            e.currentTarget.children[
              e.currentTarget.children.length - 1
            ].classList.add("hidden")
          }
          onDragOver={(e) => e.preventDefault()}
          onDragStart={(e) => console.log(e)}
          // onDrop={(e) => console.log(e.currentTarget.innerText)}
          key={index}
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
          <p className={`size-full flex items-center`}>{item}</p>
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
          <div
            className={`absolute inset-x-0 top-full hidden h-1`}
            style={{
              backgroundColor: auxTheme,
            }}
          />
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
