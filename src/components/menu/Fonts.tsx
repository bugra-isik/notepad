import { themeStore } from "@/stores/themeStore";
import { useStore } from "zustand";

export default function Fonts() {
  const { setFontFamily } = useStore(themeStore);

  const fontFamilies = ["roboto", "caveat", "script"];
  const Component = () => (
    <div className={`grid w-full grid-cols-3 `}>
      {fontFamilies.map((e) => (
        <button
          key={e}
          className={`h3 font-roboto`}
          onClick={() => setFontFamily(e)}
        >
          {e}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`flex w-4/5 flex-col items-center justify-center`}>
      <h1 className={`h1`}>Fonts</h1>
      <Component />
    </div>
  );
}
