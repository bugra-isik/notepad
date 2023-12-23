import { useStore } from "zustand";
import { themeStore } from "./Stores/ThemeStore";
import Container from "./Components/Container";
import SideMenu from "./Components/SideMenu";
import Modals from "./Components/Modals";

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
