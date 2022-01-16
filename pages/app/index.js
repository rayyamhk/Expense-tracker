import {
  useState,
  useEffect,
} from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSnackbar from '../../src/hooks/useSnackbar';
import useStyles from '../../src/hooks/useStyles';
import styles from '../../styles/app.module.css';
import Transaction from '../../src/utils/Transaction';
import DateTime from '../../src/utils/DateTime';
import Settings from '../../src/utils/Settings';

import {
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import Layout from '../../src/components/molecules/Layout';
import Button from '../../src/components/atoms/Button';
import Card from '../../src/components/atoms/Card';
import Progress from '../../src/components/atoms/Progress';
import TransactionCard from '../../src/components/molecules/TransactionCard';
import ExpenseRatio from '../../src/components/molecules/ExpenseRatio';
import Loading from '../../src/components/molecules/Loading';

const budget = 10000;
const settings = Settings.getFakeSettings();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const { setSnackbar } = useSnackbar();
  const db = useDatabase('my-test-app');
  const css = useStyles(styles);

  useEffect(() => {
    const now = Date.now()
    const [today, tomorrow] = DateTime.getDayTimestampBound(now);
    const [thisMonth, nextMonth] = DateTime.getMonthTimestampBound(now);
    db.connect('transactions')
      .then((store) => store.index('datetime_index'))
      .then((index) => {
        const range = index.IDBKeyRange.bound(
          today,
          tomorrow,
          false,
          true
        );
        return index.openCursor(range, 'prev');
      })
      .then((record) => setTransactions(record))
      .catch(({ name, message }) => setSnackbar('error', `${name}: ${message}`));

    db.connect('transactions')
      .then((store) => store.index('datetime_index'))
      .then((index) => {
        const range = index.IDBKeyRange.bound(
          thisMonth,
          nextMonth,
          false,
          true
        );
        return index.openCursor(range);
      })
      .then((record) => {
        const analysis = record.reduce((aggregated, tran) => {
          const { type, category, amount } = tran;
          if (type === 'expense') {
            if (typeof aggregated[category] === 'undefined') {
              aggregated[category] = 0;
            }
            aggregated[category] += amount;
          }
          return aggregated;
        }, {});
        setAnalysis(analysis);
      })
      .catch(({ name, message }) => setSnackbar('error', `${name}: ${message}`))
      .finally(() => setLoading(false));
  }, [db, setSnackbar]);

  if (loading) {
    return <Loading />;
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const todayExpense = transactions.reduce((total, curr) => {
    if (curr.type === 'expense') {
      total += curr.amount;
    }
    return total;
  }, 0);
  const monthExpense = Object.values(analysis).reduce((total, curr) => total += curr, 0);
  const now = Date.now();
  const dateHTML = DateTime.getStringFromTimestamp(now, 'html', settings);
  const dateDisplay = DateTime.getStringFromTimestamp(now, 'fulldate', settings);
  const balanceDisplay = visible ? Transaction.parseMoney(todayExpense) : '✱✱✱✱✱';
  const budgetDisplay = Transaction.parseMoney(monthExpense);
  const budgetLimitDisplay = Transaction.parseMoney(budget);
  const top5 = Object.entries(analysis)
    .map(([category, expense]) => ({ ...settings.categories[category], expense }))
    .sort((a, b) => b.expense - a.expense)
    .slice(0, 5);

  return (
    <Layout hideHeader={true}>
      <header className={css('header')}>
        <time dateTime={dateHTML} className={css('header-time')}>
          {dateDisplay}
        </time>
        <div className={css('header-balance')}>
          <Button variant="transparent" onClick={toggleVisibility}>
            {visible ? <MdVisibility /> : <MdVisibilityOff />}
          </Button>
          Balance: {balanceDisplay}
        </div>
        <Card elevated className={css('budget-card')}>
          <p className={css('budget-status', monthExpense > budget && 'over-budget')}>
            Budget of this month: <span>{budgetDisplay}</span> out of {budgetLimitDisplay}
          </p>
          <Progress value={monthExpense} max={budget} variant="error" />
        </Card>
      </header>
      <main className={css('main')}>
        {transactions.length > 0 && (
          <section className={css('group')}>
            <h3 className={css('group-title')}>Today</h3>
            <Card elevated>
              {transactions.map((trans) => {
                trans = Transaction.parseForDisplay(trans, settings);
                return <TransactionCard {...trans} key={trans.id} />;
              })}
            </Card>
          </section>
        )}
        <section className={css('group')}>
          <h3 className={css('group-title')}>Top 5 Expenses</h3>
          <Card elevated>
            {top5.map(({ display, icon, color, expense }, i) => (
              <ExpenseRatio
                category={display}
                icon={icon}
                iconColor={color}
                max={monthExpense}
                value={expense}
                key={i}
              />
            ))}
          </Card>
        </section>
      </main>
    </Layout>
  );
}
