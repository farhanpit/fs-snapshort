// utils/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'gallery-offline-db';
const STORE_NAME = 'gallery-offline-store';

// Open the IndexedDB database and create the object store
export async function openIndexedDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Add a data item to the object store
export async function addDataToIndexedDB(data:any) {

  const { title, category, imageUrl, description } = data;  
  const db = await openIndexedDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const dataToInsert = { title, category, imageUrl, description };
  const res= await store.add(dataToInsert);
  await tx.done;
  return res;
}

// Get all data items from the object store
export async function getAllDataFromIndexedDB() {
  const db = await openIndexedDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
}

// Clear all data from the object store
export async function clearAllDataFromIndexedDB() {
  const db = await openIndexedDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  await tx.done;
}
