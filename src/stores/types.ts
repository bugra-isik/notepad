export type ThemeType = {
  currentTheme: {
    id: string;
    bg0: string;
    bg1: string;
    bg2: string;
    bg3: string;
    text: string;
    border: string;
    hover: string;
    scrollColor: string;
    color1: string;
  };
  setCurrentTheme: (e: "theme1" | "theme2" | "theme3" | string) => void;
};

export type EditorType = {
  sourceMode: boolean;
  setSourceMode: () => void;
  currentPage: string;
  setCurrentPage: (e: string) => void;
  tabs: string[];
  setTabs: (e: string[]) => void;
  content: string;
  setContent: (e: string) => void;
  items: string[];
  setItems: (e: string[]) => void;
};

export type Utility = {
  createModal: boolean;
  setCreateModal: () => void;
  editModal: boolean;
  setEditModal: () => void;
};
