import { useStore } from "zustand";
import { themeStore } from "./stores/themeStore";

import Modals from "./components/ui/Modals";
import Container from "./components/Container";
import SideMenu from "./components/menu/SideMenu";

export default function App() {
  const { currentTheme, fontFamily } = useStore(themeStore);

  const { scrollColor } = currentTheme;

  return (
    <main
      className={`${scrollColor} ${fontFamily} relative flex h-screen w-screen min-w-full overflow-hidden  text-white transition`}
    >
      <Container />
      <SideMenu />
      <Modals />
    </main>
  );
}
