import {
  useState,
  useContext,
  useMemo,
  useEffect,
  createContext,
} from 'react';
import IndexedDB from '../utils/IndexedDB';

const defaultSettings = {
  theme: {
    primary: '#ffc107',
    primaryLight: '#ffecb3',
    primaryDark: '#ffa000',
    secondary: '#FBFBF8',
    secondaryLight: '#ffffff',
    secondaryDark: '#f5f5f5',
    textPrimary: '#212121',
    textSecondary: '#9e9e9e',
  },
  language: 'en-US',
  budget: 10000,
  dateFormat: {
    date: 'MMM DD, YYYY',
    time: 'HH:mm',
  },
  categories: [],
  subcategories: [],
  payments: [],
};
const keys = [
  'categories',
  'subcategories',
  'payments',
  'common'
];
const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const db = useMemo(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    return new IndexedDB('my-test-app', 4);
  }, []);

  const [settings, setSettings] = useState();
  const [key, setKey] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const settings = defaultSettings;
        let store = await db.connect('categories');
        let resp = await store.getAll();
        if (resp.result?.length > 0) {
          settings.categories = resp.result
        }

        store = await db.connect('subcategories');
        resp = await store.getAll();
        if (resp.result?.length > 0) {
          settings.subcategories = resp.result
        }

        store = await db.connect('payments');
        resp = await store.getAll();
        if (resp.result?.length > 0) {
          settings.payments = resp.result
        }

        store = await db.connect('common');
        resp = await store.getAll();
        resp.result.forEach(({ id, value }) => {
          settings[id] = value;
        });

        setSettings(settings);
      } catch (err) {
        console.debug(err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const go = async () => {
      if (keys.includes(key)) {
        try {
          const _settings = { ...settings };
          const store = await db.connect(key);
          const resp = await store.getAll();
          if (key === 'common') {
            resp.result.forEach(({ id, value }) => {
              _settings[id] = value;
            });
          } else {
            _settings[key] = resp.result
          }
          setSettings(_settings);
          setKey(null);
        } catch (err) {
          console.debug(err);
        }
      }
    };
    if (key) {
      go();
    }
  }, [key]);

  useEffect(() => console.log(settings));

  return (
    <SettingsContext.Provider value={[settings, setKey]}>{children}</SettingsContext.Provider>
  );
}

export default function useSettings() {
  return useContext(SettingsContext);
}
