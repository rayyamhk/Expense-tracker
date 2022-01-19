import {
  useState,
  useEffect,
} from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSettings from '../../src/hooks/useSettings';
import useSnackbar from '../../src/hooks/useSnackbar';
import useStyles from '../../src/hooks/useStyles';
import styles from '../../styles/app.module.css';
import Transaction from '../../src/utils/Transaction';
import DateTime from '../../src/utils/DateTime';
import Settings from '../../src/utils/Settings';

import Layout from '../../src/components/molecules/Layout';
import Icon from '../../src/components/atoms/Icon';
import Button from '../../src/components/atoms/Button';
import Card from '../../src/components/atoms/Card';
import Progress from '../../src/components/atoms/Progress';
import TransactionCard from '../../src/components/molecules/TransactionCard';
import ExpenseRatio from '../../src/components/molecules/ExpenseRatio';

export default function App() {
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [settings] = useSettings();
  const [setSnackbar] = useSnackbar();
  const db = useDatabase('my-test-app');
  const css = useStyles(styles);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!isMounted) {
        return;
      }
      try {
        const now = Date.now();
        const [thisMonth, nextMonth] = DateTime.getMonthTimestampBound(now);
        const store = await db.connect('transactions');
        const index = await store.index('datetime_index');
        const range = index.IDBKeyRange.bound(thisMonth, nextMonth, false, true);
        const transactions = await index.openCursor(range, 'prev');
        setTransactions(transactions);
      } catch ({ name, message }) {
        setSnackbar('error', `${name}: ${message}`);
      }
    };
    init();
    return () => isMounted = false;
  }, []);

  if (!settings) {
    return <h1>Loading.</h1>;
  }

  const toggleVisibility = () => setVisible(!visible);

  const now = Date.now();
  const [today] = DateTime.getDayTimestampBound(now);
  const { todayTransactions, categoriesExpense } = parse(transactions, today);
  const todayBalance = todayTransactions.reduce((total, { type, amount }) => type === 'expense' ? total - amount : total + amount, 0);
  const monthExpense = Object.values(categoriesExpense).reduce((total, expense) => total += expense, 0);
  const dateHTML = DateTime.getStringFromTimestamp(now, 'html', settings);
  const dateDisplay = DateTime.getStringFromTimestamp(now, 'fulldate', settings);
  const balanceDisplay = visible ? Transaction.parseMoney(todayBalance) : '✱✱✱✱✱'
  const budget = settings.budget;
  const budgetDisplay = Transaction.parseMoney(monthExpense);
  const budgetLimitDisplay = Transaction.parseMoney(budget);
  const top5 = getTop5(categoriesExpense, settings);

  return (
    <Layout hideHeader={true}>
      <div className={css('header')}>
        <time dateTime={dateHTML} className={css('header-time')}>
          {dateDisplay}
        </time>
        <div className={css('header-balance')}>
          <Button variant="transparent" onClick={toggleVisibility} >
            {visible ? <Icon icon="visibility" /> : <Icon icon="visibility_off" />}
          </Button>
          Balance: {balanceDisplay}
        </div>
        <Card elevated className={css('budget-card')}>
          <p className={css('budget-status', monthExpense > budget && 'over-budget')}>
            Budget of this month: <span>{budgetDisplay}</span> out of {budgetLimitDisplay}
          </p>
          <Progress value={monthExpense} max={budget} variant="error" />
        </Card>
      </div>
      <div className={css('container')}>
        {todayTransactions.length > 0 && (
          <section className={css('group')}>
            <h3 className={css('group-title')}>Today</h3>
            <Card elevated>
              {todayTransactions.map((tran) => {
                tran = Transaction.parseForDisplay(tran, settings);
                tran.amount = Transaction.parseMoney(tran.amount);
                tran.datetime = DateTime.getStringFromTimestamp(tran.datetime, 'time', settings);
                return <TransactionCard {...tran} key={tran.id} />;
              })}
            </Card>
          </section>
        )}
        <section className={css('group')}>
          <h3 className={css('group-title')}>Top 5 Expenses</h3>
          <Card elevated>
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
        </section>
      </div>
    </ Layout>
  );
}

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
  const _categories = Settings.arrayToObject(settings.categories);
  const top5 = Object.entries(categoriesExpense)
    .map(([category, expense]) => ({ ..._categories[category], expense }))
    .sort((a, b) => b.expense - a.expense)
    .slice(0, 5);
  return top5;
};
