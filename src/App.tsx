import { useStore } from "zustand";
import { themeStore } from "./Stores/ThemeStore";
import Container from "./Components/Container";
import SideMenu from "./Components/SideMenu";
import Modals from "./Components/Modals";

export default function App() {
  const { fontFamily } = useStore(themeStore);

  return (
    <main
      className={`${fontFamily} relative flex h-screen w-screen min-w-full overflow-hidden text-white transition`}
    >
      <Container />
      <SideMenu />
      <Modals />
    </main>
  );
}
