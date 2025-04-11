import { openDB } from "idb";

export const initDB = async () => {
  return openDB("ExcelDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("sheets")) {
        db.createObjectStore("sheets", { keyPath: "sheetName" });
      }
    },
  });
};

export const storeDataInIndexedDB = async (data: any) => {
  const db = await initDB();
  const tx = db.transaction("sheets", "readwrite");
  const store = tx.objectStore("sheets");
  await store.clear();
  for (const sheetName in data) {
    await store.put({ sheetName, ...data[sheetName] });
  }
  await tx.done;
};
