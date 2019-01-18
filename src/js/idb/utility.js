const dbPromise = idb.open("restaurant-store", 1, db => {
  if (!db.objectStoreNames.contains("restaurants")) {
    db.createObjectStore("restaurants", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("reviews")) {
    db.createObjectStore("reviews", { keyPath: "id" });
  }
});

function writeData(st, dataToWrite) {
  return dbPromise.then(db => {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    store.put(dataToWrite);
    return tx.complete;
  });
}

function readAllData(st) {
  return dbPromise.then(db => {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    return store.getAll();
  });
}
