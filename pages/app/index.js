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

const budget = 10000;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [analysis, setAnalysis] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState({});

  const db = useDatabase('my-test-app');
  const [getPayments] = useSettings('payments');
  const [getCategories] = useSettings('categories');
  const [getSubcategories] = useSettings('subcategories');
  const { setSnackbar } = useSnackbar();
  const css = useStyles(styles);

  useEffect(() => {
    const init = async () => {
      try {
        const now = Date.now();
        const [today, tomorrow] = DateTime.getDayTimestampBound(now);
        const [thisMonth, nextMonth] = DateTime.getMonthTimestampBound(now);

        const payments = await getPayments();
        const categories = await getCategories();
        const subcategories = await getSubcategories();
        const settings = { payments, categories, subcategories };

        const store = await db.connect('transactions');
        let index = await store.index('datetime_index');
        let range = index.IDBKeyRange.bound(today, tomorrow, false, true);
        const transactions = await index.openCursor(range, 'prev');
        range = index.IDBKeyRange.bound(thisMonth, nextMonth, false, true);
        const result = await index.openCursor(range);
        const analysis = result.reduce((aggregated, tran) => {
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
        setTransactions(transactions);
        setSettings(settings);
        setLoading(false);
      } catch ({ name, message }) {
        setSnackbar('error', `${name}: ${message}`);
      }
    };
    init();
  }, []);

  if (loading) {
    return <h1>Loading.</h1>;
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
  const dateHTML = DateTime.getStringFromTimestamp(now, 'html');
  const dateDisplay = DateTime.getStringFromTimestamp(now, 'fulldate');
  const balanceDisplay = visible ? Transaction.parseMoney(todayExpense) : '✱✱✱✱✱';
  const budgetDisplay = Transaction.parseMoney(monthExpense);
  const budgetLimitDisplay = Transaction.parseMoney(budget);

  const _categories = Settings._arrayToObject(settings.categories);
  const top5 = Object.entries(analysis)
    .map(([category, expense]) => ({ ..._categories[category], expense }))
    .sort((a, b) => b.expense - a.expense)
    .slice(0, 5);

  return (
    <Layout hideHeader={true}>
      <header className={css('header')}>
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
      </header>
      <main className={css('main')}>
        {transactions.length > 0 && (
          <section className={css('group')}>
            <h3 className={css('group-title')}>Today</h3>
            <Card elevated>
              {transactions.map((tran) => {
                tran = Transaction.parseForDisplay(tran, settings);
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
      </main>
    </Layout>
  );
}
