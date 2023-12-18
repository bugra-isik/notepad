import { useStore } from "zustand";
import { useCallback, useEffect } from "react";
import { themeStore } from "@/stores/themeStore";
import { editorStore } from "@/stores/editorStore";
import { VscEdit } from "react-icons/vsc";
import { db } from "@/db";
import { utilityStore } from "@/stores/utiltyStore";
import { useHover } from "@uidotdev/usehooks";

export default function Items() {
  const { currentTheme } = useStore(themeStore);
  const {
    items,
    setItems,
    setCurrentItem,
    tabs,
    setTabs,
    setCurrentPage,
    setContent,
  } = useStore(editorStore);
  const { setEditModal } = useStore(utilityStore);
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

  const ListItem = () => {
    const [ref, hovering] = useHover();

    return items.map((item, index) => (
      <button
        ref={ref}
        key={index}
        className={`${hover} ${bg2} flex h-20 items-center justify-between rounded px-4 text-start text-lg drop-shadow-lg transition sm:text-2xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-3xl`}
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
        style={{
          backgroundColor: item == "neme" ? "#608a5c" : "",
          opacity: item == "neme" && hovering ? 0.75 : 1,
        }}
      >
        <p>{item}</p>
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
    ));
  };

  return (
    <div className={`mb-4 grid grid-cols-1 gap-y-4`}>
      <ListItem />
    </div>
  );
}
