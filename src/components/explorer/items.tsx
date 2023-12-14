import { useStore } from "zustand";
import { useEffect } from "react";
import { themeStore } from "@/stores/themeStore";
import { editorStore } from "@/stores/editorStore";
import { VscCircleLarge, VscEdit } from "react-icons/vsc";
import { db } from "@/db";
import { utilityStore } from "@/stores/utiltyStore";

export default function Items() {
  const { currentTheme } = useStore(themeStore);
  const { items, setItems, setCurrentItem, tabs, setTabs, setCurrentPage } =
    useStore(editorStore);
  const { setEditModal } = useStore(utilityStore);
  // const [currentItem, setCurrentItem] = useState<string>("");
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [toggle, setToggle] = useState<boolean>(true);
  // const [inputValue, setInputValue] = useState<string>("");
  // const editRef=useRef(null)

  const { hover, bg2 } = currentTheme;

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

  const ListItem = () =>
    items.map((item, index) => (
      <button
        key={index}
        className={`${hover} ${bg2} flex h-20 items-center justify-between rounded px-4 text-start text-lg drop-shadow-lg transition sm:text-2xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-3xl`}
        onClick={() => {
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

  return (
    <div className={`mb-4 grid grid-cols-1 gap-y-4`}>
      <ListItem />
    </div>
  );
}
