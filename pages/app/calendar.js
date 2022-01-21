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
import Typography from '../../src/components/atoms/Typography';
import Icon from '../../src/components/atoms/Icon';
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
    setActiveDay(1);
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear(activeYear + 1);
    } else {
      setActiveMonth(activeMonth + 1);
    }
  };

  const prevMonth= () => {
    setActiveDay(1);
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear(activeYear - 1);
    } else {
      setActiveMonth(activeMonth - 1);
    }
  };

  const calendarHeadline = `${DateTime.translateMonth(activeMonth)} ${activeYear}`;
  const calendarCells = DateTime.getCalendarCells(activeYear, activeMonth);
  const fullDate = DateTime.getStringFromArray([activeYear, activeMonth, activeDay], 'date', settings);
  const { dailyAmount, dailyTransactions } = parse(transactions, settings);

  return (
    <Layout headline={calendarHeadline}>
      <Card
        elevation={2}
        className={css('calendar-wrapper', 'p-2')}
      >
        <table role="grid" className={css('calendar')}>
          <thead role="rowgroup">
            <tr role="row">
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Sunday">S</Typography>
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Monday">M</Typography>
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Tuesday">T</Typography>
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Wednesday">W</Typography>
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Thursday">T</Typography>
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Friday">F</Typography>
              <Typography className="py-1" component="th" variant="body" role="columnheader" aria-label="Saturday">S</Typography>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {calendarCells.map((row, i) => (
              <tr role="row" key={i}>
                {row.map(({ current, day: x }, j) => {
                  if (!current) {
                    return (
                      <td key={j} className={css('disabled')}>
                        <Typography
                          component="span"
                          variant="caption"
                          className={css('date', 'no-select')}
                        >
                          {x}
                        </Typography>
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
                      <Typography
                        component="span"
                        variant="caption"
                        className={css('date', 'no-select')}
                      >
                          {x}
                      </Typography>
                      {dailyAmount[x] && (
                        <Typography
                          component="span"
                          variant="caption"
                          className={css(
                            'amount',
                            'no-select',
                            dailyAmount[x].amount < 0 ? 'expense' : 'income'
                          )}
                        >
                          {Transaction.parseMoney(dailyAmount[x].amount, true)}
                        </Typography>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className={css('transactions-list', 'p-2', 'no-scrollbar')}>
        <div className={css('daily-breakdown', 'mb-2')}>
          <Typography component="time" variant="caption" className={css('fulldate', 'text')}>
            {fullDate}
          </Typography>
          <Typography component="span" variant="caption" className={css('mr-2', 'text')}>
            Income: <span className={css('income')}>{Transaction.parseMoney(dailyAmount[activeDay]?.income || 0)}</span>
          </Typography>
          <Typography component="span" variant="caption" className={css('text')}>
            Expense: <span className={css('expense')}>{Transaction.parseMoney(dailyAmount[activeDay]?.expense || 0)}</span>
          </Typography>
        </div>
        {dailyTransactions[activeDay] ? (
          <Card elevation={2}>
            {dailyTransactions[activeDay].map((tran) => {
              tran.amount = Transaction.parseMoney(tran.amount);
              tran.datetime = DateTime.getStringFromTimestamp(tran.datetime, 'time', settings);
              return <TransactionCard {...tran} key={tran.id} />;
            })}
          </Card>
        ) : (
          <div className={css('fallback')}>
            <Icon icon="sentiment_satisfied_alt" size="sm" className={css('fallback-icon', 'mb-1')} />
            <Typography component="p" variant="h6" className={css('fallback-text')}>No transactions for this day.</Typography>
          </div>
        )}
      </div>
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
