import { themeStore } from "@/stores/themeStore";
import { useStore } from "zustand";

export default function Fonts() {
  const { setFontFamily } = useStore(themeStore);

  return (
    <div className={`flex flex-col`}>
      <h1>Fonts</h1>
      <button onClick={() => setFontFamily("roboto")}>roboto</button>
      <button onClick={() => setFontFamily("caveat")}>caveat</button>
      <button onClick={() => setFontFamily("script")}>script</button>
    </div>
  );
}
