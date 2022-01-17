import { useMemo } from 'react';
import IndexedDB from '../utils/IndexedDB';

export default function useDatabase(dbName) {
  const db = useMemo(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    return new IndexedDB(dbName, 3);
  }, [dbName]);
  return db;
};
