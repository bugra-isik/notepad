import Dexie from "dexie";

const db = new Dexie("NotePad");
db.version(1).stores({
  myData: "title, content",
});

export default db;
