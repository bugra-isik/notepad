import Dexie, { Table } from "dexie";

export type Data = {
  title?: string;
  content?: string;
  tabs?: string[];
  items?: string[];
};

export class MySubClassedDexie extends Dexie {
  myData!: Table<Data>;

  constructor() {
    super("notepad");
    this.version(1).stores({
      myData: "title, content, tabs, items",
    });
  }
}

export const db = new MySubClassedDexie();
