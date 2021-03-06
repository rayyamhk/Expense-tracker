import {
  useState,
  useEffect,
} from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSettings from '../../src/hooks/useSettings';
import useSnackbar from '../../src/hooks/useSnackbar';
import useStyles from '../../src/hooks/useStyles';
import styles from '../../styles/calendar.module.css';
import DateTime from '../../src/utils/DateTime';
import Transaction from '../../src/utils/Transaction';

import Layout from '../../src/components/molecules/Layout';
import Icon from '../../src/components/atoms/Icon';
import Button from '../../src/components/atoms/Button';
import Card from '../../src/components/atoms/Card';
import TransactionCard from '../../src/components/molecules/TransactionCard';

export default function Calendar() {
  const [year, month, day] = DateTime.getArrayFromTimestamp(Date.now());
  const [activeYear, setActiveYear] = useState(year);
  const [activeMonth, setActiveMonth] = useState(month);
  const [activeDay, setActiveDay] = useState(day);
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
        const store = await db.connect('transactions');
        const index = await store.index('datetime_index');
        const timestamp = DateTime.getTimestampFromArray([activeYear, activeMonth]);
        const [lowerBound, upperBound] = DateTime.getMonthTimestampBound(timestamp);
        const range = index.IDBKeyRange.bound(lowerBound, upperBound, false, true);
        const transactions = await index.openCursor(range, 'next');
        setTransactions(transactions);
      } catch ({ name, message }) {
        setSnackbar('error', `${name}: ${message}`);
      }
    }
    init();
    return () => isMounted = false;
  }, [activeMonth, activeYear]);

  if (!settings) {
    return <h1>Loading.</h1>;
  }

  const nextMonth= () => {
    setActiveDay(null);
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear(activeYear + 1);
    } else {
      setActiveMonth(activeMonth + 1);
    }
  };

  const prevMonth= () => {
    setActiveDay(null);
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear(activeYear - 1);
    } else {
      setActiveMonth(activeMonth - 1);
    }
  };

  const calendarHeadline = `${DateTime.translateMonth(activeMonth)} ${activeYear}`;
  const calendarCells = DateTime.getCalendarCells(activeYear, activeMonth);
  const { dailyAmount, dailyTransactions } = parse(transactions, settings);

  return (
    <Layout
      headline={calendarHeadline}
      className={css('main')}
      actions={(
        <>
          <Button
            onClick={prevMonth}
            variant="transparent"
            className={css('icon')}
          >
            <Icon icon="keyboard_arrow_left" />
          </Button>
          <Button
            onClick={nextMonth}
            variant="transparent"
            className={css('icon')}
          >
            <Icon icon="keyboard_arrow_right" />
          </Button>
        </>
      )}
    >
      <table role="grid" className={css('calendar', dailyTransactions[activeDay] && 'active')}>
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" aria-label="Sunday">Sun</th>
            <th role="columnheader" aria-label="Monday">Mon</th>
            <th role="columnheader" aria-label="Tuesday">Tue</th>
            <th role="columnheader" aria-label="Wednesday">Wed</th>
            <th role="columnheader" aria-label="Thursday">Thu</th>
            <th role="columnheader" aria-label="Friday">Fri</th>
            <th role="columnheader" aria-label="Saturday">Sat</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {calendarCells.map((row, i) => (
            <tr role="row" key={i}>
              {row.map(({ current, day: x }, j) => {
                if (!current) {
                  return (
                    <td key={j} className={css('disabled')}>
                      <span className={css('date', 'no-select')}>{x}</span>
                    </td>
                  );
                }
                return (
                  <td
                    role="gridcell"
                    tabIndex={-1}
                    onClick={() => setActiveDay(x)}
                    className={css(
                      'no-tab',
                      activeYear === year && activeMonth === month && x === day && 'today',
                      activeDay === x && 'active',
                    )}
                    key={j}
                  >
                    <span className={css('date', 'no-select')}>{x}</span>
                    {dailyAmount[x] && (
                      <span className={css('amount', 'no-select', dailyAmount[x].amount < 0 ? 'expense' : 'income')}>
                        {Transaction.parseMoney(dailyAmount[x].amount, true)}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {dailyTransactions[activeDay] && (
        <div className={css('transactions-list', 'no-scrollbar')}>
          <div className={css('daily-breakdown')}>
            <span>
              Income: <span className={css('income')}>{Transaction.parseMoney(dailyAmount[activeDay]?.income || 0)}</span>
            </span>
            <span>
              Expense: <span className={css('expense')}>{Transaction.parseMoney(dailyAmount[activeDay]?.expense || 0)}</span>
            </span>
          </div>
          <Card>
            {dailyTransactions[activeDay].map((tran) => {
              tran.amount = Transaction.parseMoney(tran.amount);
              tran.datetime = DateTime.getStringFromTimestamp(tran.datetime, 'time', settings);
              return (
                <TransactionCard
                  className={css('transaction-card')}
                  {...tran}
                  key={tran.id}
                />
              ) ;
            })}
          </Card>
        </div>
      )}
    </Layout>
  );
}

function parse(transactions = [], settings) {
  const dailyAmount = {}, dailyTransactions = {};
  transactions.forEach((tran) => {
    const day = DateTime.getArrayFromTimestamp(tran.datetime)[2];
    if (!dailyAmount[day]) {
      dailyAmount[day] = { income: 0, expense: 0 };
    }
    dailyAmount[day][tran.type] += tran.amount;

    if (!dailyTransactions[day]) {
      dailyTransactions[day] = [];
    }
    dailyTransactions[day].push(Transaction.parseForDisplay(tran, settings));
  });
  Object.values(dailyAmount).forEach((obj) => {
    obj.amount = obj.income - obj.expense;
  });
  return { dailyAmount, dailyTransactions };
};
