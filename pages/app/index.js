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

import { categories } from '../../src/fake';

const budget = 10000;

export default function App() {
  const db = useDatabase('my-test-app');
  const { showSnackbar } = useSnackbar();
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [spent, setSpent] = useState(0);
  const css = useStyles(styles);

  useEffect(() => {
    const todayTimestamp = DateTime.getTodayTimestamp();
    const tmrTimestamp = todayTimestamp + 1000 * 60 * 60 * 24;
    const [thisMonthTimestamp, nextMonthTimestamp] =
      DateTime.getMonthTimestampBound();
    db.connect('transactions')
      .then((store) => store.index('datetime_index'))
      .then((index) => {
        const range = index.IDBKeyRange.bound(
          todayTimestamp,
          tmrTimestamp,
          false,
          true
        );
        return index.openCursor(range, 'prev');
      })
      .then((record) => setTransactions(record))
      .catch(({ name, message }) => {
        showSnackbar('error', `${name}: ${message}`);
      });

    db.connect('transactions')
      .then((store) => store.index('datetime_index'))
      .then((index) => {
        const range = index.IDBKeyRange.bound(
          thisMonthTimestamp,
          nextMonthTimestamp,
          false,
          true
        );
        return index.openCursor(range);
      })
      .then((record) => {
        const spent = record.reduce((total, curr) => (total += curr.amount), 0);
        setSpent(spent);
      })
      .catch(({ name, message }) => {
        showSnackbar('error', `${name}: ${message}`);
      });
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const balance = transactions.reduce((prev, curr) => (prev += curr.amount), 0);

  return (
    <Layout hideHeader={true}>
      <header className={css('header')}>
        <time dateTime="2022-01-04" className={css('header-time')}>
          {DateTime.getTodayDisplay()}
        </time>
        <div className={css('header-balance')}>
          <Button variant="transparent" onClick={toggleVisibility}>
            {visible ? <MdVisibility /> : <MdVisibilityOff />}
          </Button>
          Balance: {visible ? Transaction.parseMoney(balance) : '✱✱✱✱✱'}
        </div>
        <Card elevated className={css('budget-card')}>
          <p className={css('budget-status', spent > budget && 'over-budget')}>
            Budget of this month: <span>{Transaction.parseMoney(spent)}</span>{' '}
            out of {Transaction.parseMoney(budget)}
          </p>
          <Progress value={spent} max={budget} />
        </Card>
      </header>
      <main className={css('main')}>
        <section className={css('group')}>
          <h3 className={css('group-title')}>Today</h3>
          <Card elevated>
            {transactions.map((trans) => {
              trans = Transaction.parseForDisplay(trans, categories);
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
