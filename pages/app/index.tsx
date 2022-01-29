import {
  useState,
  useEffect,
} from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSettings from '../../src/hooks/useSettings';
import useSnackbar from '../../src/hooks/useSnackbar';
import css from '../../src/utils/css';
import TransactionUtils from '../../src/utils/Transaction';
import DateTime from '../../src/utils/DateTime';
import Settings from '../../src/utils/Settings';

import Layout from '../../src/components/organisms/Layout';
import TransactionCard from '../../src/components/organisms/TransactionCard';
import ExpenseRatio from '../../src/components/organisms/ExpenseRatio';
import Switch from '../../src/components/atoms/Switch';
import IconButton from '../../src/components/atoms/IconButton';
import Typography from '../../src/components/atoms/Typography';
import Card from '../../src/components/atoms/Card';
import Progress from '../../src/components/atoms/Progress';

import { Transaction } from '../../src/types';


export default function App() {
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // whole month
  const [settings, reloadSettings] = useSettings();
  const [setSnackbar] = useSnackbar();
  const db = useDatabase('my-test-app');

  useEffect(() => {
    const init = async () => {
      try {
        const now = Date.now();
        const [thisMonth, nextMonth] = DateTime.getMonthTimestampBound(now);
        const store = await db.connect('transactions');
        const index = store.index('datetime_index');
        const range = index.IDBKeyRange.bound(thisMonth, nextMonth, false, true);
        const transactions = await index.openCursor(range, 'prev') as Transaction[];
        setTransactions(transactions);
      } catch ({ name, message }) {
        setSnackbar('error', `${name}: ${message}`);
      }
    };
    init();
  }, []);

  if (!settings) {
    return <h1>Loading.</h1>;
  }

  const toggleVisibility = () => setVisible(!visible);
  const onThemeChange = async () => {
    try {
      const store = await db.connect('common', 'readwrite');
      const value = {
        mode: settings.theme.mode === 'dark' ? 'light' : 'dark',
        color: settings.theme.color,
      };
      await store.put({ id: 'theme', value });
      reloadSettings('theme');
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };

  const themeMode = settings?.theme?.mode || 'light';
  const visibility = visible ? 'visibility' : 'visibility_off';
  const now = Date.now();
  const [today] = DateTime.getDayTimestampBound(now);
  const { todayTransactions, categoriesExpense } = parse(transactions, today);
  const todayBalance = todayTransactions.reduce((total, { type, amount }) => type === 'expense' ? total - amount : total + amount, 0);
  const monthExpense = Object.values(categoriesExpense).reduce((total, expense) => total += expense, 0) as number;
  const dateDisplay = DateTime.getStringFromTimestamp(now, 'fulldate', settings);
  const balanceDisplay = visible ? TransactionUtils.parseMoney(todayBalance) : '✱✱✱✱✱'
  const budget = settings?.budget;
  const budgetDisplay = TransactionUtils.parseMoney(monthExpense);
  const budgetLimitDisplay = TransactionUtils.parseMoney(budget);
  const top5 = getTop5(categoriesExpense, settings);

  return (
    <Layout hideHeader={true}>
      <Card
        as="header"
        squared
        elevation={1}
        className="bg-layout px-4 pt-6 pb-11 relative"
      >
        <Typography
          as="time"
          variant="h1"
          className="text-on-layout"
        >
          {dateDisplay}
        </Typography>
        <Typography
          as="h4"
          variant="h4"
          className="text-on-layout flex my-2"
        >
          <IconButton
            icon={visibility}
            size="xs"
            variant="transparent"
            onClick={toggleVisibility}
            squared
            className="mr-2"
          />
            Balance: {balanceDisplay}
        </Typography>
        <Card
          elevation={2}
          className="bg-surface p-4 absolute inset-x-4 -bottom-9"
        >
          <Typography
            as="p"
            variant="h6"
            className="text-on-surface mb-4"
          >
            Budget of this month: <span className={budgetDisplay > budgetLimitDisplay && 'font-bold text-error-light'}>{budgetDisplay}</span> out of {budgetLimitDisplay}
          </Typography>
          <Progress value={monthExpense} max={budget} variant="error" />
        </Card>
        <Switch
          className="absolute right-4 top-7"
          checked={themeMode === 'dark'}
          onChange={onThemeChange}
        />
      </Card>
      <Card className="px-4 pb-4 pt-[calc(40px+0.75rem)]">
        {todayTransactions.length > 0 && (
          <Card as="section" className="p-0 mb-4">
            <Typography
              variant="h3"
              as="h3"
              className="mb-4"
            >
              Today
            </Typography>
            <Card elevation={2}>
              {todayTransactions.map((tran) => {
                tran = TransactionUtils.parseForDisplay(tran, settings);
                tran.amount = TransactionUtils.parseMoney(tran.amount);
                tran.datetime = DateTime.getStringFromTimestamp(tran.datetime, 'time', settings);
                return <TransactionCard {...tran} key={tran.id} />;
              })}
            </Card>
          </Card>
        )}
        <Card as="section" className="p-0">
          <Typography
            variant="h3"
            as="h3"
            className="mb-4"
          >
            Top 5 Expenses
          </Typography>
          <Card elevation={2}>
            {top5.map(({ expense, value, ...rest }, i) => (
              <ExpenseRatio
                key={i}
                category={value}
                max={monthExpense}
                value={expense}
                {...rest}
              />
            ))}
          </Card>
        </Card>
      </Card>
    </ Layout>
  );
};

function parse(transactions = [], today) {
  const todayTransactions = [], categoriesExpense = {};
  transactions.forEach((x) => {
    const { datetime, type, category: cat, amount } = x;
    if (datetime >= today) {
      todayTransactions.push(x);
    }
    if (type === 'expense') {
      categoriesExpense[cat] = categoriesExpense[cat] ? categoriesExpense[cat] + amount : amount;
    }
  });
  return { todayTransactions, categoriesExpense };
};

function getTop5(categoriesExpense, settings) {
  if (!settings) {
    return [];
  }
  const _categories = Settings.arrayToObject(settings.categories);
  const top5 = Object.entries(categoriesExpense)
    .map(([category, expense]) => ({ ..._categories[category], expense }))
    .sort((a, b) => b.expense - a.expense)
    .slice(0, 5);
  return top5;
};
