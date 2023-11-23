import { useStore } from "zustand";
import { themeStore } from "./stores/themeStore";
import SideBar from "./components/sideBar/sideBar";
import Frame from "./components/frame/frame";
import Menu from "./components/menu/menu";

export default function App() {
  const { currentTheme } = useStore(themeStore);

  const { bg0, scrollColor } = currentTheme;

  return (
    <main
      className={`${bg0} ${scrollColor}  relative flex h-screen w-screen min-w-full overflow-hidden p-4 pr-8 text-white transition`}
    >
      <div
        className={`z-10 flex w-full gap-4 overflow-hidden rounded-lg drop-shadow-2xl`}
      >
        <SideBar />
        <Frame />
      </div>
      <Menu />
    </main>
  );
}
