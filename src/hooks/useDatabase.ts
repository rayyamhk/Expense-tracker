import { useMemo } from 'react';
import IndexedDB from '../utils/IndexedDB';

export default function useDatabase(dbName: string) {
  const db = useMemo(() => {
    return new IndexedDB(dbName, 4);
  }, [dbName]);
  return db;
};
