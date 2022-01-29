declare const window: any;

type rejectError = (e: Event) => void;
type resolveStore = (store: StoreWrapper) => void;
type resolveRequest = (req: IDBRequest) => void;

class IndexedDB {
  indexedDB: IDBFactory;
  dbName: string;
  version: number;

  constructor(dbName: string, version: number) {
    if (typeof window !== 'undefined') {
      this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      this.dbName = dbName;
      this.version = version;
    }
  };

  connect(storeName: string, mode: 'readonly' | 'readwrite' = 'readonly') {
    return new Promise((resolve: resolveStore, reject: rejectError) => {
      const openReq = this.indexedDB.open(this.dbName, this.version);
      openReq.onsuccess = (e) => {
        const db = openReq.result; // e.target.result
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
      openReq.onupgradeneeded = (e) => {
        const oldVersion = e.oldVersion;
        const db = openReq.result;
        const upgradeTransaction = openReq.transaction;
      
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
      
        // upgrade from v2 to v3
        if (oldVersion < 3) {
          console.log('v2 to v3');
          db.createObjectStore('categories', { keyPath: 'id' });
          const store = db.createObjectStore('subcategories', { keyPath: 'id' });
          store.createIndex('category_index', 'category', { unique: false });
        }
      
        // upgrade from v3 to v4
        if (oldVersion < 4) {
          console.log('v3 to v4');
          db.createObjectStore('common', { keyPath: 'id' });
        }
      };
    });
  };
}

class StoreWrapper {
  store: IDBObjectStore;
  IDBKeyRange = IDBKeyRange;

  constructor(store: IDBObjectStore) {
    this.store = store;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  };

  add(value: object, key?: IDBValidKey) {
    return new Promise((resolve: resolveRequest, reject: rejectError) => {
      const req = this.store.add(value, key);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target as IDBRequest);
    });
  };

  put(item: object, key?: IDBValidKey) {
    return new Promise((resolve: resolveRequest, reject: rejectError) => {
      const req = this.store.put(item, key);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target as IDBRequest);
    });
  };

  get(key: IDBValidKey) {
    return new Promise((resolve: resolveRequest, reject: rejectError) => {
      const req = this.store.get(key);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target as IDBRequest);
    });
  };

  getAll(query?: IDBKeyRange | IDBValidKey, count?: number) {
    return new Promise((resolve: resolveRequest, reject: rejectError) => {
      const req = this.store.getAll(query, count);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target as IDBRequest);
    });
  };

  delete(key: IDBKeyRange | IDBValidKey) {
    return new Promise((resolve: resolveRequest, reject: rejectError) => {
      const req = this.store.delete(key);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target as IDBRequest);
    });
  };

  index(name: string) {
    const index = this.store.index(name);
    return new IndexWrapper(index);
  };
}

class IndexWrapper {
  index: IDBIndex;
  IDBKeyRange = IDBKeyRange;

  constructor(index: IDBIndex) {
    this.index = index;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  };

  getAll(query?: IDBKeyRange | IDBValidKey, count?: number) {
    return new Promise((resolve: resolveRequest, reject: rejectError) => {
      const req = this.index.getAll(query, count);
      req.onerror = (e) => reject(e);
      req.onsuccess = (e) => resolve(e.target as IDBRequest);
    });
  };

  openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection) {
    return new Promise((resolve: (value: object[]) => void, reject: rejectError) => {
      const req = this.index.openCursor(range, direction);
      const results: object[] = [];
      req.onsuccess = () => {
        const cursor = req.result; // e.target.result
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

export default IndexedDB;
