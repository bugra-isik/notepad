import { useStore } from "zustand";
import { themeStore } from "./stores/themeStore";
import Frame from "./components/frame/frame";
import Menu from "./components/menu/menu";
import Explorer from "./components/explorer/explorer";

import { utilityStore } from "./stores/utiltyStore";
import { AnimatePresence } from "framer-motion";
import CreateItem from "./components/ui/CreateItem";
import EditItem from "./components/ui/EditItem";

export default function App() {
  const { currentTheme, fontFamily } = useStore(themeStore);
  const { createModal, editModal } = useStore(utilityStore);

  const { bg0, scrollColor } = currentTheme;

  return (
    <main
      className={`${bg0} ${scrollColor} ${fontFamily} relative flex h-screen w-screen min-w-full overflow-hidden p-4 pr-8 text-white transition`}
    >
      <div className={`z-10 flex w-full overflow-hidden rounded-lg`}>
        <Explorer />
        <Frame />
      </div>
      <Menu />
      <AnimatePresence>{createModal && <CreateItem />}</AnimatePresence>
      <AnimatePresence>{editModal && <EditItem />}</AnimatePresence>
    </main>
  );
}
