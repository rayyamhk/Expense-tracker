import {
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useSettings from '../../../src/hooks/useSettings';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction.module.css';
import Transaction from '../../../src/utils/Transaction';
import DateTime from '../../../src/utils/DateTime';

import Layout from '../../../src/components/molecules/Layout';
import Icon from '../../../src/components/atoms/Icon';
import TextField from '../../../src/components/atoms/TextField';
import Button from '../../../src/components/atoms/Button';
import Dialog from '../../../src/components/atoms/Dialog';

export default function TransactionDetails() {
  const [popUp, setPopUp] = useState(false);
  const [transaction, setTransaction] = useState();
  const [settings] = useSettings();
  const [setSnackbar] = useSnackbar();
  const router = useRouter();
  const db = useDatabase('my-test-app');
  const css = useStyles(styles);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!router.isReady || !router.query.id || !isMounted) {
        return;
      }
      try {
        let store = await db.connect('transactions');
        const { result: transaction } = await store.get(router.query.id);
        if (!transaction) {
          router.replace('/app');
          setSnackbar('warning', 'Invalid transaction.');
          return;
        }
        setTransaction(transaction);
      } catch ({ name, message }) {
        setSnackbar('error', `${name}: ${message}`);
      }
    };
    init();
    return () => isMounted = false;
  }, [router]);

  if (!settings || !transaction) {
    return <h1>Loading.</h1>;
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
  const dateDisplay = DateTime.getStringFromTimestamp(datetime, 'datetime', settings);

  const onCloseDialog = () => setPopUp(false);
  const onOpenDialog = () => setPopUp(true);
  const onDelete = async () => {
    try {
      const store = await db.connect('transactions', 'readwrite');
      await store.delete(router.query.id);
      setSnackbar('success', 'Transaction Deleted!');
      router.replace('/app');
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };
  const onEdit = () => {
    router.push(`/app/transactions/create?id=${transaction.id}`);
  };

  return (
    <Layout headline={headline} className={css('main')}>
      <div className={css('input-row')}>
        <Icon icon="calendar_today" color="#f44336" className={css('icon')} />
        <TextField
          type="text"
          label="Date Time"
          value={dateDisplay}
          disabled
          id="datetime"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="category" color="#3f51b5" className={css('icon')} />
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
        <Icon icon="dashboard" color="#2196f3" className={css('icon')} />
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
        <Icon icon="attach_money" color="#ffc107" className={css('icon')} />
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
        <Icon icon="payment" color="#673ab7" className={css('icon')} />
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
        <Icon icon="store" color="#4caf50" className={css('icon')} />
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
        <Icon icon="insert_comment" color="#e91e63" className={css('icon')} />
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
      <Button
        onClick={onOpenDialog}
        shape="circle"
        variant="error"
        float
        className={css('float-btn', 'float-btn-left')}
      >
        <Icon icon="delete" />
      </Button>
      <Button
        onClick={onEdit}
        shape="circle"
        variant="success"
        float
        className={css('float-btn')}
      >
        <Icon icon="mode" />
      </Button>
      {popUp && (
        <Dialog onClose={onCloseDialog} className={css('popup')}>
          <Icon icon="delete_forever" className={css('popup-icon')} />
          <h2 className={css('popup-title')}>Are you sure you want to delete this transaction?</h2>
          <div className={css('popup-actions')}>
            <Button
              autoFocus
              variant="primary"
              shape="round"
              size="large"
              shadow
              className={css('popup-btn')}
              onClick={onCloseDialog}
            >
              No
            </Button>
            <Button
              variant="transparent"
              shape="round"
              size="large"
              shadow
              className={css('popup-btn')}
              onClick={onDelete}
            >
              Yes
            </Button>
          </div>
        </Dialog>
      )}
    </Layout>
  );
}
