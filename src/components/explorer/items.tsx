import { useStore } from "zustand";
import { useCallback, useEffect, useState } from "react";
import { VscEdit, VscAdd, VscStarEmpty } from "react-icons/vsc";
import { db } from "@/db";
import { themeStore } from "@/Stores/ThemeStore";
import { editorStore } from "@/Stores/EditorStore";
import { utilityStore } from "@/Stores/UtiltyStore";
import { MdDragIndicator } from "react-icons/md";

export default function Items() {
  const { auxTheme } = useStore(themeStore);
  const {
    items,
    setItems,
    setCurrentItem,
    tabs,
    setTabs,
    setCurrentPage,
    setContent,
    searchedItem,
    setSearchedItem,
  } = useStore(editorStore);
  const { setEditModal, setCreateModal } = useStore(utilityStore);
  const [dragStart, setDragStart] = useState<number>(0);
  const [itemHover, setItemHover] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Explorer > Item component click() function when the searched content is clicked
    // If "searchedItem" is not undefined, search for a DOM item with the specified "searchedItem" ID
    // If this item is found (i.e. if it has the value "button"), programmatically click on the found item
    // Reset the "searchedItem" value after each "useEffect" call
    if (searchedItem !== undefined) {
      const button = document.getElementById(searchedItem);
      if (button) {
        button.click();
      }
    }
    return () => setSearchedItem(undefined);
  }, [searchedItem, setSearchedItem]);

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

  const getData = useCallback(
    async (currentTab: string) => {
      const data = await db.myData.get(currentTab);
      data && setContent(data.content ?? "");
    },
    [setContent],
  );

  const switchItems = useCallback(
    // Function that replaces items by taking a sequence number
    // Creating a new array to replace the elements
    // The item in the queue where the drag operation starts is moved to the destination queue number
    // Moves the item in the destination queue number to the queue where the drag operation started
    // Other elements are kept the same
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
      // Apply the new order to the elements of the component
      setItems(newArr);
    },
    [dragStart, items, setItems],
  );

  const deneme = useCallback(async (currentTab: string) => {
    await db.myData.put({
      title: currentTab,
      starred: true,
    });
  }, []);

  return (
    <aside className={`mb-4 grid grid-cols-1 gap-y-2  overflow-y-scroll`}>
      {items.map((item, index) => (
        <button
          id={item}
          key={index}
          draggable
          onDragOver={(e) => e.preventDefault()}
          onDragStart={() => setDragStart(index)}
          onDrop={() => {
            switchItems(index);
          }}
          className={`btn-hover relative flex h-12 w-full items-center justify-between rounded bg-c2 px-4 text-start drop-shadow-lg`}
          onClick={() => {
            getData(item);
            setCurrentItem(item);
            !tabs.includes(item) && setTabs([...tabs, item]);
            setCurrentPage(item);
          }}
          onMouseEnter={() => setItemHover(index)}
          onMouseLeave={() => setItemHover(undefined)}
        >
          <p className={`flex size-full items-center`}>{item}</p>

          <div className={`flex gap-4`}>
            <i
              className={`${itemHover === index ? "visible" : "invisible"}`}
              onClick={(e) => {
                setCurrentItem(item);
                setEditModal();
                e.stopPropagation();
              }}
            >
              <VscEdit />
            </i>
            <i
              className={`${itemHover === index ? "visible" : "invisible"}`}
              onClick={(e) => {
                e.stopPropagation();
                deneme(item);
              }}
            >
              <VscStarEmpty />
            </i>
            <i>
              <MdDragIndicator />
            </i>
          </div>
        </button>
      ))}
      <button
        className={`btn-hover flex h-12 w-full items-center justify-center rounded text-start transition`}
        onClick={() => setCreateModal()}
        style={{ color: auxTheme }}
      >
        <VscAdd />
      </button>
    </aside>
  );
}
