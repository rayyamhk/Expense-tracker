import {
  useState,
  useContext,
  useMemo,
  useEffect,
  createContext,
} from 'react';
import IndexedDB from '../utils/IndexedDB';
import themes from '../utils/themes.json';
import { Settings, SettingKeys, Theme } from '../types';

type ContextType = [
  Settings,
  Dispatch<React.SetStateAction<SettingKeys>>
];

const defaultSettings: Settings = {
  theme: {
    mode: 'light',
    color: 'amber',
  },
  language: 'en-US',
  budget: 10000,
  dateTimeFormat: {
    date: 'MMM DD, YYYY',
    time: 'HH:mm',
  },
  categories: [],
  subcategories: [],
  payments: [],
};
const storeNames = {
  'categories': 'categories',
  'subcategories': 'subcategories',
  'payments': 'payments',
  'theme': 'common',
  'budget': 'common',
  'dateTimeFormat': 'common',
};
const SettingsContext = createContext<ContextType>([undefined, undefined]);

export function SettingsProvider({ children }) {
  const db = useMemo(() => {
    return new IndexedDB('my-test-app', 4);
  }, []);

  const [settings, setSettings] = useState<Settings>();
  const [key, setKey] = useState<SettingKeys>();

  useEffect(() => {
    const init = async () => {
      try {
        const settings = defaultSettings;
        let store = await db.connect('categories');
        let resp = await store.getAll();
        if (resp.result?.length > 0) {
          settings.categories = resp.result;
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
        switchTheme(settings.theme);
        setSettings(settings);
      } catch (err) {
        console.debug(err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const go = async () => {
      const storeName = storeNames[key];
      if (storeName) {
        try {
          const _settings = { ...settings };
          const store = await db.connect(storeName);
          const resp = await store.getAll();
          if (storeName === 'common') {
            resp.result.forEach(({ id, value }) => {
              _settings[id] = value;
            });
          } else {
            _settings[key] = resp.result
          }
          if (key === 'theme') {
            switchTheme(_settings.theme);
          }
          setSettings(_settings);
          setKey(null);
        } catch (err) {
          console.debug(err);
        }
      }
    };
    key && go();
  }, [key]);

  useEffect(() => console.log(settings));

  return (
    <SettingsContext.Provider value={[settings, setKey]}>{children}</SettingsContext.Provider>
  );
};

export default function useSettings() {
  return useContext(SettingsContext);
};

function switchTheme({ mode, color }) {
  Object.entries(themes[color]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
};
