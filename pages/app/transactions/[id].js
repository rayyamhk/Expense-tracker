import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useSettings from '../../../src/hooks/useSettings';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction.module.css';
import Transaction from '../../../src/utils/Transaction';
import DateTime from '../../../src/utils/DateTime';

import {
  MdCategory,
  MdOutlineCategory,
  MdAttachMoney,
  MdCalendarToday,
  MdStore,
  MdPayment,
  MdInsertComment,
  MdDeleteOutline,
  MdDeleteForever,
  MdOutlineMode,
} from 'react-icons/md';
import Layout from '../../../src/components/molecules/Layout';
import TextField from '../../../src/components/atoms/TextField';
import Button from '../../../src/components/atoms/Button';
import Loading from '../../../src/components/molecules/Loading';
import Dialog from '../../../src/components/atoms/Dialog';

export default function TransactionDetails() {
  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);

  const router = useRouter();
  const db = useDatabase('my-test-app');
  const [paymentSettings] = useSettings('payments');
  const { setSnackbar } = useSnackbar();
  const css = useStyles(styles);

  const settings = {};

  useEffect(() => {
    let isMounted = true;
    const { isReady, query } = router;
    if (isReady && isMounted) {
      const id = query.id;
      db.connect('transactions')
        .then((store) => store.get(id))
        .then((record) => {
          setTransaction(record);
          setLoading(false);
        })
        .catch(({ name, message }) => setSnackbar('error', `${name}: ${message}`));
    }
    return () => isMounted = false;
  }, [router, db, setSnackbar]);

  if (loading) {
    return <Loading />;
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
  } = Transaction.parseForDisplay(transaction, paymentSettings);
  const headline = type === 'expense' ? 'Expense' : 'Income';
  const dateDisplay = DateTime.getStringFromTimestamp(datetime, 'datetime', settings);

  const onCloseDialog = () => setPopUp(false);
  const onOpenDialog = () => setPopUp(true);

  const onDelete = () => {
    db.connect('transactions', 'readwrite')
      .then((store) => store.delete(router.query.id))
      .then(() => {
        setSnackbar('success', 'Transaction Deleted!');
        router.push('/app');
      })
      .catch(({ name, message }) => setSnackbar('error', `${name}: ${message}`));
  };

  const onEdit = () => {
    router.push(`/app/transactions/create?id=${transaction.id}`);
  };

  return (
    <Layout headline={headline} className={css('main')}>
      <div className={css('input-row')}>
        <MdCalendarToday fill="#f44336" className={css('icon')} />
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
      <Button
        onClick={onOpenDialog}
        shape="circle"
        variant="error"
        float
        className={css('float-btn', 'float-btn-left')}
      >
        <MdDeleteOutline />
      </Button>
      <Button
        onClick={onEdit}
        shape="circle"
        variant="success"
        float
        className={css('float-btn')}
      >
        <MdOutlineMode />
      </Button>
      {popUp && (
        <Dialog onClose={onCloseDialog} className={css('popup')}>
          <MdDeleteForever className={css('popup-icon')} />
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
