import { useStore } from "zustand";
import { themeStore } from "../../../stores/themeStore";
import { useRef, useState } from "react";
import { editorStore } from "../../../stores/editorStore";
import Dexie from "dexie";

export default function Nav() {
  const { currentTheme } = useStore(themeStore);
  const { currentPage, setCurrentPage, setSourceMode, tabs, setTabs } =
    useStore(editorStore);
  const [hovering, setHovering] = useState<number | null>(null);
  const ref = useRef<HTMLLIElement>(null);

  const { bg1, bg2, hover, text } = currentTheme;

  const tabsMap = tabs.map((item, index) => {
    return (
      <li
        key={index}
        ref={ref}
        className={`${
          item == currentPage ? bg2 : bg1
        } ${hover} flex h-4/5 w-40 cursor-pointer select-none items-center justify-between truncate rounded-t-lg px-5 transition focus:bg-black`}
        onClick={() => {
          setCurrentPage(item);
        }}
        onMouseEnter={() => setHovering(index)}
        onMouseLeave={() => setHovering(null)}
      >
        <p className={`w-4/5 truncate`}>{item}</p>
        {hovering == index && (
          <button
            className={``}
            onClick={(e) => {
              e.stopPropagation();
              if (index == 0) {
                setCurrentPage(tabs[index + 1]);
              } else if (index > 0) {
                setCurrentPage(tabs[index - 1]);
              }
              setTabs(tabs.filter((e) => e !== item));
            }}
          >
            X
          </button>
        )}
      </li>
    );
  });

  const db = new Dexie("MyDatabase");
  db.version(1).stores({
    items: "id,zort,age",
  });

  const addData = async () => {
    await db.table("items").add({ id: "zoret23", zort: "John3", age: 30 });
    await db.table("items").add({ id: "zoret2", name: "Jane", age: 25 });
  };

  return (
    <nav
      className={`${bg1} ${text} relative z-50 flex h-10 w-full items-center justify-between px-10`}
    >
      <ul className={`flex h-full items-end gap-px`}>
        {tabsMap}
        <button
          className={`ml-5 self-center text-4xl`}
          onClick={() => {
            tabs[tabs.length - 1] !== "New tab" &&
              setTabs([...tabs, "New tab"]);
            setCurrentPage("New tab");
          }}
        >
          +
        </button>
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
