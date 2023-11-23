import { themeType } from "./types";
import { create } from "zustand";

export const themes: Record<
  string,
  {
    id: string;
    bg0: string;
    bg1: string;
    bg2: string;
    bg3: string;
    text: string;
    border: string;
    hover: string;
    scrollColor:string
  }
> = {
  theme1: {
    id: "theme1",
    bg0: "bg-[#262626]/95",
    bg1: "bg-[#262626]",
    bg2: "bg-[#1e1e1e]",
    bg3: "bg-[#b3b3b3]",
    text: "text-[#b3b3b3]",
    border: "border-[#b3b3b3]/50",
    hover: "hover:bg-[#b3b3b3]/10",
    scrollColor:"scroll1"
  },
  theme2: {
    id: "theme2",
    bg0: "bg-[#f6f6f6]/95",
    bg1: "bg-[#f6f6f6]",
    bg2: "bg-[#ffffff]",
    bg3: "bg-[#5c5c5c]",
    text: "text-[#5c5c5c]",
    border: "border-[#5c5c5c]/50",
    hover: "hover:bg-[#5c5c5c]/10",
    scrollColor:"scroll2"
  },
  theme3: {
    id: "theme3",
    bg0: "bg-[#181c20]/95",
    bg1: "bg-[#181c20]",
    bg2: "bg-[#1c2127]",
    bg3: "bg-[#bec6cf]",
    text: "text-[#bec6cf]",
    border: "border-[#bec6cf]/50",
    hover: "hover:bg-[#bec6cf]/10",
    scrollColor:"scroll3"
  },
};

const themeStore = create<themeType>()((set) => ({
  currentTheme: themes.theme1,
  setCurrentTheme: (e) => set(() => ({ currentTheme: themes[e] })),
}));

export { themeStore };
