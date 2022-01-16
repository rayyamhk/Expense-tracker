import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import useDatabase from './useDatabase';
import useSnackbar from './useSnackbar';
import Utils from '../utils/Settings';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const db = useDatabase('my-test-app');
  const { setSnackbar } = useSnackbar();

  useEffect(() => {
    console.log('fetching settings...');
    const settings = {};
    db.connect('payments')
      .then((store) => store.getAll())
      .then((record) => settings.payments = Utils._parsePayments(record))
      .catch(({ message, name }) => setSnackbar(`${name}: ${message}`))
      .finally(() => setSettings(settings));
  }, [db, setSnackbar]);

  useEffect(() => console.log(settings), [settings])

  const saver = useCallback((settingKey) => {
    return (key, value) => {
      if (!settings[settingKey]) {
        settings[settingKey] = {};
      }
      db.connect(settingKey, 'readwrite')
        .then((store) => store.put({ id: key, ...settings[settingKey][key], ...value }))
        .then(() => {
          setSettings({
            ...settings,
            [settingKey]: {
              ...settings[settingKey],
              [key]: {
                ...settings[settingKey][key],
                ...value,
              },
            },
          })
        })
        .catch(({ message, name }) => setSnackbar(`${name}: ${message}`));
    }
  }, [settings, db, setSnackbar]);

  const getter = useCallback((key) => {
    return settings[key] || {};
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ getter, saver }}>{children}</SettingsContext.Provider>
  );
}

export default function useSettings(key) {
  const ctx = useContext(SettingsContext);
  return [ctx.getter(key), ctx.saver(key)];
}
