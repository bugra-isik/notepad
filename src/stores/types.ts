export type themeType = {
  currentTheme: {
    id: string;
    bg0: string;
    bg1: string;
    bg2: string;
    bg3: string;
    text: string;
    border: string;
    hover: string;
    scrollColor:string
  };
  setCurrentTheme: (e: "theme1" | "theme2" | "theme3" | string) => void;
};
