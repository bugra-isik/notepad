import { useStore } from "zustand";
import { useState } from "react";
import { themeStore } from "@/stores/themeStore";

export default function Items() {
  const { currentTheme } = useStore(themeStore);
  const [currentItem, setCurrentItem] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([
    "xqhgt",
    "plfso",
    "czqjp",
    "kjvni",
    "fwbtd",
  ]);

  const ListItem = () =>
    items.map((item, index) => (
      <div
        key={index}
        className={`${currentTheme.hover} flex h-20 items-center justify-between rounded px-4 text-start text-lg transition sm:text-2xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-3xl`}
        onClick={() => setCurrentItem(item)}
      >
        {toggle ? (
          <>
            <p className={`truncate`}>{item}</p>
            <button
              className={`basis-1/4 text-xs`}
              onClick={() => {
                setToggle(false);
                setCurrentIndex(index);
                setInputValue("");
              }}
            >
              edit
            </button>
            <button
              className={`basis-1/4`}
              onClick={() => setItems((e) => e.filter((_, i) => i !== index))}
            >
              X
            </button>
          </>
        ) : currentIndex == index ? (
          <>
            <input
              className={`flex w-3/4 resize-none items-center bg-transparent focus:outline-none`}
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
            <button
              className={`basis-1/4`}
              onClick={() => {
                const updatedItems = [...items];
                if (inputValue !== "") {
                  updatedItems[currentIndex] = inputValue;
                  setToggle(true);
                }
                updatedItems[index] !== undefined && setItems(updatedItems);
              }}
            >
              &#x2713;
            </button>
            <button className={`basis-1/4`} onClick={() => setToggle(true)}>
              X
            </button>
          </>
        ) : (
          <>
            <p className={`truncate`}>{item}</p>
            <button
              className={`basis-1/4 text-xs`}
              onClick={() => {
                setToggle(false);
                setCurrentIndex(index);
                setInputValue("");
              }}
            >
              edit
            </button>
            <button
              className={`basis-1/4`}
              onClick={() => setItems((e) => e.filter((_, i) => i !== index))}
            >
              X
            </button>
          </>
        )}
      </div>
    ));

  return (
    <>
      <div className={`grid grid-cols-1`}>
        <ListItem />
      </div>
      
    </>
  );
}
