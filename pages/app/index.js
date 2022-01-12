import { useState, useEffect } from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSnackbar from '../../src/hooks/useSnackbar';
import useStyles from '../../src/hooks/useStyles';
import styles from '../../styles/app.module.css';
import Transaction from '../../src/utils/Transaction';
import DateTime from '../../src/utils/DateTime';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Layout from '../../src/components/molecules/Layout';
import Button from '../../src/components/atoms/Button';
import Card from '../../src/components/atoms/Card';
import Progress from '../../src/components/atoms/Progress';
import TransactionCard from '../../src/components/molecules/TransactionCard';

import settings from '../../src/fake';

const budget = 10000;

export default function App() {
  const { showSnackbar } = useSnackbar();
  const db = useDatabase('my-test-app');
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [spent, setSpent] = useState(0);
  const css = useStyles(styles);

  useEffect(() => {
    const [today, tomorrow] = DateTime.getTodayTimestampBound();
    const [thisMonth, nextMonth] = DateTime.getMonthTimestampBound();
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
      .catch(({ name, message }) => showSnackbar('error', `${name}: ${message}`));

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
        const spent = record.reduce((total, curr) => (total += curr.amount), 0);
        setSpent(spent);
      })
      .catch(({ name, message }) => showSnackbar('error', `${name}: ${message}`));
  }, [db, showSnackbar]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const balance = transactions.reduce((prev, curr) => (prev += curr.amount), 0);
  const now = Date.now();
  const dateHTML = DateTime.getHTMLTime(now);
  const dateDisplay = DateTime.getDisplayTime(now);
  const balanceDisplay = visible ? Transaction.parseMoney(balance) : '✱✱✱✱✱';
  const budgetDisplay = Transaction.parseMoney(spent);
  const budgetLimitDisplay = Transaction.parseMoney(budget);

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
          <p className={css('budget-status', spent > budget && 'over-budget')}>
            Budget of this month: <span>{budgetDisplay}</span> out of {budgetLimitDisplay}
          </p>
          <Progress value={spent} max={budget} />
        </Card>
      </header>
      <main className={css('main')}>
        <section className={css('group')}>
          <h3 className={css('group-title')}>Today</h3>
          <Card elevated>
            {transactions.map((trans) => {
              trans = Transaction.parseForDisplay(trans, settings);
              return <TransactionCard {...trans} key={trans.id} />;
            })}
          </Card>
        </section>
        <section className={css('group')}>
          <h3 className={css('group-title')}>Top 5</h3>
        </section>
      </main>
    </Layout>
  );
}
