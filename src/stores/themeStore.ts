import { create } from "zustand";
import { ThemeType } from "./Types";

const fontFamily: { [key: string]: string } = {
  roboto: "font-roboto",
  caveat: "font-caveat",
  script: "font-dancing-script",
};

const themeStore = create<ThemeType>()((set) => ({ 
  fontFamily: fontFamily.roboto,
  setFontFamily: (e) => set(() => ({ fontFamily: fontFamily[e] })),
  auxTheme: "#8a5cf5",
  setAuxTheme: (e) => set(() => ({ auxTheme: e })),
}));

export { themeStore };
