import { useState } from 'react';
import useDatabase from '../../../src/hooks/useDatabase';
import useSettings from '../../../src/hooks/useSettings';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/settings.module.css';
import Transaction from '../../../src/utils/Transaction';
import DateTime from '../../../src/utils/DateTime';
import availableThemes from '../../../src/utils/Themes';

import Layout from '../../../src/components/molecules/Layout';
import Icon from '../../../src/components/atoms/Icon';
import Card from '../../../src/components/atoms/Card';
import Link from '../../../src/components/atoms/Link';
import Dialog from '../../../src/components/atoms/Dialog';
import Button from '../../../src/components/atoms/Button';
import TextField from '../../../src/components/atoms/TextField';
import Select from '../../../src/components/atoms/Select';

export default function Settings() {
  const [active, setActive] = useState();
  const [settings, reloadSettings] = useSettings();
  const [setSnackbar] = useSnackbar();
  const db = useDatabase('my-test-app');
  const css = useStyles(styles);

  if (!settings) {
    return <h1>Loading.</h1>;
  }

  const closePopUp = () => setActive(null);
  const openThemePopUp = () => setActive('theme');
  const openBudgetPopUp = () => setActive('budget');
  const openDateFormatPopUp = () => setActive('date');
  const updateTheme = async (theme) => {
    if (theme.primary === settings.theme.primary) {
      setSnackbar('warning', 'Unchanged value.');
      return;
    }
    try {
      const store = await db.connect('common', 'readwrite');
      await store.put({ id: 'theme', value: theme });
      setSnackbar('success', 'Theme Color Updated!');
      closePopUp();
      reloadSettings('common');
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  }
  const updateBudget = async (budget) => {
    budget = Number(budget);
    if (Number.isNaN(budget) || budget <= 0) {
      setSnackbar('error', 'Invalid budget.');
      return;
    }
    if (budget === settings.budget) {
      setSnackbar('warning', 'Unchanged value.');
      return;
    }
    try {
      const store = await db.connect('common', 'readwrite');
      await store.put({ id: 'budget', value: budget });
      setSnackbar('success', 'Budget Updated!');
      closePopUp();
      reloadSettings('common');
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };
  const updateDateTime = async (date, time) => {
    if (date === settings.dateFormat.date && time === settings.dateFormat.time) {
      setSnackbar('warning', 'Unchanged value.');
      return;
    }
    try {
      const store = await db.connect('common', 'readwrite');
      await store.put({ id: 'dateFormat', value: { date, time } });
      setSnackbar('success', 'Date Format Updated!');
      closePopUp();
      reloadSettings('common');
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };

  return (
    <Layout headline="Settings" className={css('main')} >
      <Card elevated>
        <div className={css('row')} onClick={openThemePopUp}>
          <Icon
            icon="palette"
            color={settings.theme.primary}
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Theme</h3>
          <div
            className={css('color-square')}
            style={{
              backgroundColor: settings.theme.primary,
              border: `2px solid ${settings.theme.primaryLight}`,
            }}
          />
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </div>
        <Link href="/app/settings/language" className={css('row')}>
          <Icon
            icon="translate"
            color="#40c4ff"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Language</h3>
          <span className={css('setting-value')}>English</span>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </Link>
        <div className={css('row')} onClick={openBudgetPopUp}>
          <Icon
            icon="savings"
            color="#f9a825"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Budget</h3>
          <span className={css('setting-value')}>{Transaction.parseMoney(settings.budget)}</span>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </div>
        <div className={css('row')} onClick={openDateFormatPopUp}>
          <Icon
            icon="calendar_today"
            color="#f44336"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Date Format</h3>
          <span className={css('setting-value')}>{DateTime.getStringFromTimestamp(Date.now(), 'date', settings)}</span>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </div>
        <Link href="/app/settings/categories" className={css('row')}>
          <Icon
            icon="category"
            color="#3f51b5"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Categories</h3>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </Link>
        <Link href="/app/settings/payments" className={css('row')}>
          <Icon
            icon="payment"
            color="#673ab7"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Payments</h3>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </Link>
        <Link href="/app/settings/backup" className={css('row')}>
          <Icon
            icon="backup"
            color="#81d4fa"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Backup</h3>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </Link>
        <Link href="/app/donate" className={css('row')}>
          <Icon
            icon="local_cafe"
            color="#795548"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Donate</h3>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </Link>
        <Link href="/app/faq" className={css('row')}>
          <Icon
            icon="help_outline"
            color="#546e7a"
            className={css('setting-icon')}
          />
          <h3 className={css('setting-title')}>Help</h3>
          <Icon icon="keyboard_arrow_right" className={css('arrow-icon')} />
        </Link>
      </Card>
      <p className={css('version')}>SmartMoney v1.0</p>
      {active === 'theme' && <ThemePopUp onClose={closePopUp} onUpdate={updateTheme} theme={settings.theme} />}
      {active === 'budget' && <BudgetPopUp onClose={closePopUp} onUpdate={updateBudget} budget={settings.budget} />}
      {active === 'date' && <DateFormatPopUp onClose={closePopUp} onUpdate={updateDateTime} dateFormat={settings.dateFormat.date} timeFormat={settings.dateFormat.time} />}
    </Layout>
  );
}

function ThemePopUp({ theme, onClose, onUpdate }) {
  const css = useStyles(styles);
  return (
    <Dialog onClose={onClose} className={css('popup')}>
      <h2 className={css('popup-title')}>Color Theme</h2>
      <div className={css('themes-container')}>
        {availableThemes.map((_theme, i) => (
          <div
            style={{
              backgroundColor: _theme.primary,
              border: `2px solid ${_theme.primaryLight}`
            }}
            className={css('color-square', _theme.primaryColor === theme.primaryColor && 'active')}
            onClick={() => onUpdate(_theme)}
            key={i}
          />
        ))}
      </div>
      <div className={css('popup-actions')}>
        <Button
          variant="transparent"
          shape="round"
          size="large"
          shadow
          className={css('popup-btn')}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

function BudgetPopUp({ budget, onClose, onUpdate }) {
  const [input, setInput] = useState(budget);
  const css = useStyles(styles);

  const onChange = (e) => setInput(e.target.value);
  const onSubmit = () => onUpdate(input);

  return (
    <Dialog onClose={onClose} className={css('popup')}>
      <h2 className={css('popup-title')}>What is your budget?</h2>
      <TextField
        id="budget"
        label="Budget"
        type="number"
        min="0"
        value={input}
        onChange={onChange}
        className={css('input')}
      />
      <div className={css('popup-actions')}>
        <Button
          variant="transparent"
          shape="round"
          size="large"
          shadow
          className={css('popup-btn')}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          shape="round"
          size="large"
          shadow
          className={css('popup-btn')}
          onClick={onSubmit}
        >
          Update
        </Button>
      </div>
    </Dialog>
  );
};

function DateFormatPopUp({ dateFormat, timeFormat, onClose, onUpdate }) {
  const [date, setDate] = useState(dateFormat);
  const [time, setTime] = useState(timeFormat);
  const css = useStyles(styles);

  const onDateChange = (id) => setDate(id);
  const onTimeChange = (id) => setTime(id);
  const onSubmit = () => onUpdate(date, time);

  const dateOptions = {
    'MMM DD, YYYY': 'Dec 31, 2022',
    'DD MMM, YYYY': '31 Dec, 2022',
    'MM/DD/YYYY': '12/31/2022',
    'DD/MM/YYYY': '31/12/2022',
  };
  const timeOptions = {
    'HH:mm': '23:59',
    'HH:mm A': '11:59 PM',
  };

  return (
    <Dialog onClose={onClose} className={css('popup')}>
      <h2 className={css('popup-title')}>Which format do you prefer?</h2>
      <Select
        label="Date"
        options={Object.entries(dateOptions).map(([id, value]) => ({ id, value }))}
        selected={{ id: date, value: dateOptions[date] }}
        onSelect={onDateChange}
        className={css('input')}
      />
      <Select
        label="Time"
        options={Object.entries(timeOptions).map(([id, value]) => ({ id, value }))}
        selected={{ id: time, value: timeOptions[time] }}
        onSelect={onTimeChange}
        className={css('input')}
      />
      <div className={css('popup-actions')}>
        <Button
          variant="transparent"
          shape="round"
          size="large"
          shadow
          className={css('popup-btn')}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          shape="round"
          size="large"
          shadow
          className={css('popup-btn')}
          onClick={onSubmit}
        >
          Update
        </Button>
      </div>
    </Dialog>
  );
};