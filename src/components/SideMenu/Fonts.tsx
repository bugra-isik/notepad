import { themeStore } from "@/Stores/ThemeStore";
import { useStore } from "zustand";

export default function Fonts() {
  const { setFontFamily,currentTheme } = useStore(themeStore);
  const {text}=currentTheme


  const fontFamilies = ["roboto", "caveat", "script"];

  return (
    <div className={`flex w-4/5 flex-col items-center justify-center`}>
      <h1 className={`${text} h1`}>Fonts</h1>
      <div className={`grid w-full grid-cols-3 `}>
        {fontFamilies.map((e) => (
          <button
            key={e}
            className={`${text} h3 font-roboto capitalize`}
            onClick={() => setFontFamily(e)}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
