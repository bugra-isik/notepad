import { themeStore } from "@/stores/themeStore";
import { useStore } from "zustand";

export default function Fonts() {
  const { setFontFamily } = useStore(themeStore);

  const fontFamilies = ["roboto", "caveat", "script"];

  return (
    <div className={`flex w-4/5 flex-col items-center justify-center`}>
      <h1 className={`h1`}>Fonts</h1>
      <div className={`grid w-full grid-cols-3 `}>
        {fontFamilies.map((e) => (
          <button
            key={e}
            className={`h3 font-roboto capitalize`}
            onClick={() => setFontFamily(e)}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
