import { useStore } from "zustand";
import { themeStore } from "../../stores/themeStore";
import { useState } from "react";

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

  console.log();

  const itemsMap = items.map((item, index) => (
    <button
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
    </button>
  ));

  return (
    <>
      <div className={`grid grid-cols-1`}>{itemsMap}</div>
      <button
        className={`${currentTheme.hover} flex h-20 w-full items-center rounded text-start text-lg transition sm:text-2xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-3xl`}
        onClick={() => setItems((e) => [...e, " "])}
      >
        Add new
      </button>
    </>
  );
}
