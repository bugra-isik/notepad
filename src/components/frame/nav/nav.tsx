import { useStore } from "zustand";
import { themeStore } from "../../../stores/themeStore";
import { useState } from "react";
import { useHover } from "@uidotdev/usehooks";

export default function Nav({
  setSourceMode,
}: {
  setSourceMode: (e: (e: boolean) => boolean) => void;
}) {
  const { currentTheme } = useStore(themeStore);
  const [focus, setFocus] = useState<number>();
  const [hovering, setHovering] = useState<number | null>(null);
  const [items, setItems] = useState<string[]>([
    "xqhgt",
    "plfso",
    "czqjp",
    "kjvni",
    "fwbtd",
  ]);

  const { bg1, bg2, hover, text } = currentTheme;

  const tabs = items.map((item, index) => {
    return (
      <li
        key={index}
        className={`${
          index == focus ? bg2 : bg1
        } ${hover} flex h-4/5 w-40 cursor-pointer items-center justify-between truncate rounded-t-lg px-5 transition focus:bg-black`}
        onClick={() => setFocus(index)}
        onMouseEnter={() => setHovering(index)}
        onMouseLeave={() => setHovering(null)}
      >
        {item}
        {hovering == index && (
          <button
            className={``}
            onClick={() => setItems((e) => e.filter((_, i) => i !== index))}
          >
            X
          </button>
        )}
      </li>
    );
  });
  return (
    <nav
      className={`${bg1} ${text} fixed inset-x-0 left-0 top-0 z-50 mb-10 flex h-10 items-center justify-between px-10`}
    >
      <ul className={`flex h-full items-end gap-px`}>
        {tabs}
        <button
          className={`ml-5 self-center text-4xl`}
          onClick={() => {
            items[items.length - 1] !== "" &&
              setItems((e) => [...e, "New tab"]);
            setFocus(items.length);
          }}
        >
          +
        </button>
      </ul>
      <button
        className={`absolute right-0 h-full w-10 cursor-pointer bg-red-400`}
        onClick={() => setSourceMode((e) => !e)}
      />
    </nav>
  );
}
