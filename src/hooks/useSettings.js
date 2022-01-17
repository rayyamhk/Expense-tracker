import {
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import IndexedDB from '../utils/IndexedDB';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const db = useMemo(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    return new IndexedDB('my-test-app', 3);
  }, []);

  const saver = useCallback((settingKey) => {
    return (key, value) => {
      return new Promise((resolve, reject) => {
        db.connect(settingKey, 'readwrite')
          .then((store) => store.get(key))
          .then(({ store, result }) => store.put({ id: key, ...result, ...value }))
          .then((result) => resolve(result))
          .catch((e) => reject(e));
      });
    };
  }, [db]);

  const getter = useCallback((settingKey) => {
    return (key, indexName) => {
      return new Promise((resolve, reject) => {
        if (indexName) {
          db.connect(settingKey)
            .then((store) => store.index(indexName))
            .then((index) => index.getAll(key))
            .then(({ result }) => resolve(result))
            .catch((e) => reject(e));
        } else {
          db.connect(settingKey)
            .then((store) => store.getAll(key))
            .then(({ result }) => {
              if (key) {
                result = result[0];
              }
              resolve(result);
            })
            .catch((e) => reject(e));
          }
      });
    };
  }, [db]);

  return (
    <SettingsContext.Provider value={{ getter, saver }}>{children}</SettingsContext.Provider>
  );
}

export default function useSettings(key) {
  const ctx = useContext(SettingsContext);
  return [ctx.getter(key), ctx.saver(key)];
}
