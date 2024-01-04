export type ThemeType = {  
  fontFamily: string;
  setFontFamily: (e: string) => void;
  auxTheme: string;
  setAuxTheme: (e: string) => void;
};

export type EditorType = {
  sourceMode: boolean;
  setSourceMode: (e: boolean) => void;
  currentPage: string;
  setCurrentPage: (e: string) => void;
  tabs: string[];
  setTabs: (e: string[]) => void;
  content: string;
  setContent: (e: string) => void;
  items: string[];
  setItems: (e: string[] | undefined) => void;
  currentItem: string;
  setCurrentItem: (e: string) => void;
  searchedItem:string|undefined;
  setSearchedItem: (e: string|undefined) => void;
};

export type Utility = {
  createModal: boolean;
  setCreateModal: () => void;
  editModal: boolean;
  setEditModal: () => void;
  deleteAllDataModal: boolean;
  setDeleteAllDataModal: () => void;
  searchModal: boolean;
  setSearchModal: () => void;
};
