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
import Typography from '../../../src/components/atoms/Typography';

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
    <Layout headline={headline} className="p-2">
      <div className={css('input-row', 'mb-2')}>
        <Icon icon="calendar_today" color="#f44336" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Date Time"
          value={dateDisplay}
          disabled
          id="datetime"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row', 'mb-2')}>
        <Icon icon="category" color="#3f51b5" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Category"
          value={category}
          disabled
          id="category"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row', 'mb-2')}>
        <Icon icon="dashboard" color="#2196f3" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Subcategory"
          value={subcategory || ' '}
          disabled
          id="subcategory"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row', 'mb-2')}>
        <Icon icon="attach_money" color="#ffc107" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Amount"
          value={amount}
          disabled
          id="amount"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row', 'mb-2')}>
        <Icon icon="payment" color="#673ab7" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Payment"
          value={payment || ' '}
          disabled
          id="payment"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row', 'mb-2')}>
        <Icon icon="store" color="#4caf50" size="lg" className="mr-2" />
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
        <Icon icon="insert_comment" color="#e91e63" size="lg" className="mr-2" />
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
        className={css('delete-btn')}
      >
        <Icon icon="delete" size="md" />
      </Button>
      <Button
        onClick={onEdit}
        shape="circle"
        variant="success"
        float
        className={css('edit-btn')}
      >
        <Icon icon="mode" size="md" />
      </Button>
      {popUp && (
        <Dialog onClose={onCloseDialog} className={css('popup')}>
          <Icon icon="delete_forever" size="xl" className={css('popup-icon')} />
          <Typography
            component="h2"
            variant="h2"
            align="center"
          >
            Are you sure you want to delete this transaction?
          </Typography>
          <div className={css('popup-actions', 'mt-2')}>
            <Button
              variant="primary"
              shape="round"
              size="large"
              shadow
              className="mx-2"
              onClick={onCloseDialog}
            >
              <Typography component="span" variant="body">No</Typography>
            </Button>
            <Button
              variant="transparent"
              shape="round"
              size="large"
              shadow
              className="mx-2"
              onClick={onDelete}
            >
              <Typography component="span" variant="body">Yes</Typography>
            </Button>
          </div>
        </Dialog>
      )}
    </Layout>
  );
}
