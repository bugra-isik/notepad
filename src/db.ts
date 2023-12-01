import Dexie, { Table } from "dexie";

export type Data = {
  title: string;
  content: string;
};

export class MySubClassedDexie extends Dexie {
  myData!: Table<Data>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      myData: "title, content",
    });
  }
}

export const db = new MySubClassedDexie();
