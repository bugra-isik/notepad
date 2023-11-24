import { useStore } from "zustand";
import { themeStore } from "../../../stores/themeStore";
import { useState } from "react";
import { editorStore } from "../../../stores/editorStore";

export default function Nav() {
  const { currentTheme } = useStore(themeStore);
  const { setCurrentPage, setSourceMode, tabs, setTabs } =
    useStore(editorStore);
  const [focus, setFocus] = useState<number>();
  const [hovering, setHovering] = useState<number | null>(null);

  const { bg1, bg2, hover, text } = currentTheme;

  const tabsMap = tabs.map((item, index) => {
    return (
      <li
        key={index}
        className={`${
          index == focus ? bg2 : bg1
        } ${hover} flex h-4/5 w-40 cursor-pointer select-none items-center justify-between truncate rounded-t-lg px-5 transition focus:bg-black`}
        onClick={() => {
          setFocus(index);
          setCurrentPage(item);
        }}
        onMouseEnter={() => setHovering(index)}
        onMouseLeave={() => setHovering(null)}
      >
        <p className={`w-4/5 truncate`}>{item}</p>
        {hovering == index && (
          <button
            className={``}
            onClick={() => setTabs(tabs.filter((e) => e !== item))}
          >
            X
          </button>
        )}
      </li>
    );
  });

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
            setFocus(tabs.length);
            setCurrentPage("New tab");
          }}
        >
          +
        </button>
      </ul>
      <button
        className={`absolute right-0 h-full w-10 cursor-pointer bg-red-400`}
        onClick={() => setSourceMode()}
      />
    </nav>
  );
}
