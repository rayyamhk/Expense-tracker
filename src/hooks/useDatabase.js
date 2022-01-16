import { useMemo } from 'react';

class IndexedDB {
  constructor(dbName, version) {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: 'readwrite'};
    this.dbName = dbName;
    this.version = version;
    this._transaction = null;
  };

  connect(storeName, mode) {
    return new Promise((resolve, reject) => {
      const openReq = this.indexedDB.open(this.dbName, this.version);
      openReq.onupgradeneeded = upgrade;
      openReq.onsuccess = (e) => {
        const db = e.target.result;
        const transactions = db.transaction(storeName, mode);
        const store = transactions.objectStore(storeName);
        resolve(new StoreWrapper(store));

        db.onclose = (e) => console.debug('db onclose: ', e);
        db.onabort = (e) => console.debug('db onabort: ', e);
        db.onerror = (e) => reject(e);
        db.onversionchange = (e) => console.debug('db onversionchange: ', e);
        transactions.onabort = (e) => console.debug('transaction onabort: ', e);
        transactions.oncomplete = () => db.close();
        // transactions.onerror = (e) => reject(e);
      };
      openReq.onerror = (e) => reject(e);
      openReq.onblocked = (e) => console.debug('open request onblocked: ', e);
    });
  };
}

class StoreWrapper {
  constructor(store) {
    this.store = store;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  };

  add(...args) {
    return new Promise((resolve, reject) => {
      const req = this.store.add(...args);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target.result);
    });
  };

  put(...args) {
    return new Promise((resolve, reject) => {
      const req = this.store.put(...args);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target.result);
    });
  };

  get(...args) {
    return new Promise((resolve, reject) => {
      const req = this.store.get(...args);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target.result);
    });
  };

  getAll(...args) {
    return new Promise((resolve, reject) => {
      const req = this.store.getAll(...args);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target.result);
    });
  };

  delete(...args) {
    return new Promise((resolve, reject) => {
      const req = this.store.delete(...args);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target.result);
    });
  };

  index(name) {
    const index = this.store.index(name);
    return new IndexWrapper(index);
  };
}

class IndexWrapper {
  constructor(index) {
    this.index = index;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  };

  getAll(...args) {
    return new Promise((resolve, reject) => {
      const req = this.index.getAll(...args);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target.result);
    });
  };

  openCursor(...args) {
    return new Promise((resolve, reject) => {
      const req = this.index.openCursor(...args);
      const results = [];
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = (e) => reject(e);
    });
  };
}

export default function useDatabase(dbName) {
  const db = useMemo(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    return new IndexedDB(dbName, 2);
  }, [dbName]);
  return db;
};

function upgrade(e) {
  const oldVersion = e.oldVersion;
  const db = e.target.result;
  const upgradeTransaction = e.target.transaction;

  // init v1
  if (oldVersion < 1) {
    console.log('v0 to v1');
    const store = db.createObjectStore('transactions', { keyPath: 'id' });
    store.createIndex('datetime_index', 'datetime', { unique: false });
  }

  // upgrade from v1 to v2
  if (oldVersion < 2) {
    console.log('v1 to v2');
    db.createObjectStore('payments', { keyPath: 'id' });
    const transactionsStore = upgradeTransaction.objectStore('transactions');
    transactionsStore.createIndex('payment_index', 'payment', { unique: false });
  }
};
