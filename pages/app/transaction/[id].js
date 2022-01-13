import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction-id.module.css';
import Transaction from '../../../src/utils/Transaction';
import DateTime from '../../../src/utils/DateTime';
import Settings from '../../../src/utils/Settings';

import {
  MdOutlineAttachMoney,
  MdCategory,
  MdOutlineCategory,
  MdAttachMoney,
  MdCalendarToday,
  MdStore,
  MdPayment,
  MdInsertComment,
  MdDone,
} from 'react-icons/md';
import Layout from '../../../src/components/molecules/Layout';
import TextField from '../../../src/components/atoms/TextField';
import Icon from '../../../src/components/atoms/Icon';

const settings = Settings.getFakeSettings();

export default function TransactionDetails() {
  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(true);
  const { isReady, query } = useRouter();
  const db = useDatabase('my-test-app');
  const { showSnackbar } = useSnackbar();
  const css = useStyles(styles);

  useEffect(() => {
    if (isReady) {
      const id = query.id;
      db.connect('transactions')
        .then((store) => store.get(id))
        .then((record) => setTransaction(record))
        .catch(({ name, message }) => showSnackbar('error', `${name}: ${message}`))
        .finally(() => setLoading(false));
    }
  }, [isReady, query, db, showSnackbar]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!transaction) {
    return <h1>Not found.</h1>;
  }

  const {
    type,
    datetime,
    category,
    subcategory,
    amount,
    payment,
    brand,
    details,
  } = Transaction.parseForDisplay(transaction, settings);
  const headline = type === 'expense' ? 'Expense' : 'Income';

  return (
    <Layout headline={headline}>
      <pre>{JSON.stringify(transaction, null, 2)}</pre>
      <main className={css('main')}>
        <div className={css('input-row')}>
          <MdCalendarToday fill="#f44336" className={css('icon')} />
          <TextField
            type="text"
            label="Date"
            value={new Date().toLocaleString()}
            disabled
            id="datetime"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdCategory fill="#3f51b5" className={css('icon')} />
          <TextField
            type="text"
            label="Category"
            value={category}
            disabled
            id="category"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdOutlineCategory fill="#2196f3" className={css('icon')} />
          <TextField
            type="text"
            label="Subcategory"
            value={subcategory || ' '}
            disabled
            id="subcategory"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdAttachMoney fill="#ffc107" className={css('icon')} />
          <TextField
            type="text"
            label="Amount"
            value={amount}
            disabled
            id="amount"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdPayment fill="#673ab7" className={css('icon')} />
          <TextField
            type="text"
            label="Payment"
            value={payment || ' '}
            disabled
            id="payment"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdStore fill="#4caf50" className={css('icon')} />
          <TextField
            type="text"
            label="Brand"
            value={brand || ' '}
            disabled
            id="brand"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdInsertComment fill="#e91e63" className={css('icon')} />
          <TextField
            type="textarea"
            rows="3"
            label="Details"
            value={details || ' '}
            disabled
            id="details"
            className={css('textfield')}
          />
        </div>
      </main>
    </Layout>
  );
}
