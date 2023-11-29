import { useStore } from "zustand";
import { useCallback, useState } from "react";
import { editorStore } from "@/stores/editorStore";
import { themeStore } from "@/stores/themeStore";
import db from "@/db";

export default function Nav() {
  const { currentTheme } = useStore(themeStore);
  const {
    currentPage,
    setCurrentPage,
    setSourceMode,
    tabs,
    setTabs,
    content,
    setContent,
  } = useStore(editorStore);

  const [hoverIndex, setHoverIndex] = useState<number | null>();

  const { bg1, bg2, hover, text } = currentTheme;

  const addData = useCallback(async () => {
    try {
      const existingRecord = await db.table("myData").get(currentPage);
      if (existingRecord) {
        console.log("Kayıt zaten var:", existingRecord);
        await db.table("myData").add({
          title: currentPage,
          content: content,
        });
      } else {
        // Kayıt yoksa, yeni kaydı ekleyin
        await db.table("myData").add({
          title: currentPage,
          content: content,
        });
        console.log("Yeni kayıt eklendi!");
      }
    } catch (error) {
      console.error("İşlem sırasında hata oluştu:", error);
    }
  }, [content, currentPage]);

  const getContentFromDB = async (item: string) =>
    await db
      .table("myData")
      .get(item)
      .then((e) => setContent(e.content));

  const TabList = () =>
    tabs.map((item, index) => {
      const isCurrentPage = item === currentPage;
      const handleClick = () => {
        setCurrentPage(item);
        getContentFromDB(item);
      };
      return (
        <li
          key={index}
          className={`${
            isCurrentPage ? bg2 : bg1
          } ${hover} flex h-4/5 w-40 cursor-pointer select-none items-center justify-between truncate rounded-t-lg px-5 transition focus:bg-black`}
          onClick={handleClick}
          // onMouseEnter={() => setHoverIndex(index)}
          // onMouseLeave={() => setHoverIndex(null)}
        >
          <p className={`w-4/5 truncate`}>{item}</p>
          {/* <button
            hidden={!(hoverIndex == index)}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(index === 0 ? tabs[1] : tabs[index - 1]);
              setTabs(tabs.filter((e) => e !== item));
            }}
          >
            X
          </button> */}
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
        onClick={() => addData()}
      />
      <button
        className={`absolute right-0 h-full w-10 cursor-pointer bg-red-400`}
        onClick={() => setSourceMode()}
      />
    </nav>
  );
}
