import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useSettings from '../../../src/hooks/useSettings';
import useSnackbar from '../../../src/hooks/useSnackbar';
import css from '../../../src/utils/css';
import TransactionUtils from '../../../src/utils/Transaction';
import DateTimeUtils from '../../../src/utils/DateTime';

import Layout from '../../../src/components/organisms/Layout';
import TextField from '../../../src/components/molecules/TextField';
import Dialog from '../../../src/components/molecules/Dialog';
import Button from '../../../src/components/atoms/Button';
import Icon from '../../../src/components/atoms/Icon';
import IconButton from '../../../src/components/atoms/IconButton';
import Typography from '../../../src/components/atoms/Typography';

import {
  Transaction,
} from '../../../src/types';

export default function TransactionDetails() {
  const [popUp, setPopUp] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const [settings] = useSettings();
  const [setSnackbar] = useSnackbar();
  const router = useRouter();
  const db = useDatabase('my-test-app');

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!router.isReady || !router.query.id || !isMounted) {
        return;
      }
      try {
        let store = await db.connect('transactions');
        const { result: transaction }: { result: Transaction } = await store.get(router.query.id);
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
    return () => { isMounted = false; };
  }, [router]);

  if (!settings || !transaction) {
    return <h1>Loading.</h1>;
  };

  const {
    type,
    datetime,
    category,
    subcategory,
    amount,
    payment,
    brand,
    details,
  } = TransactionUtils.parseForDisplay(transaction, settings);
  const headline = type === 'expense' ? 'Expense' : 'Income';
  const dateDisplay = DateTimeUtils.getStringFromTimestamp(datetime, 'datetime', settings);

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
    <Layout headline={headline}>
      <div className="flex mb-5">
        <Icon icon="calendar_today" color="#f44336" size="lg" className="mr-4" />
        <TextField
          type="text"
          label="Date Time"
          value={dateDisplay}
          disabled
          id="datetime"
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="category" color="#3f51b5" size="lg" className="mr-4" />
        <TextField
          type="text"
          label="Category"
          value={category}
          disabled
          id="category"
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="dashboard" color="#2196f3" size="lg" className="mr-4" />
        <TextField
          type="text"
          label="Subcategory"
          value={subcategory}
          disabled
          id="subcategory"
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="attach_money" color="#ffc107" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Amount"
          value={amount?.toString()}
          disabled
          id="amount"
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="payment" color="#673ab7" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Payment"
          value={payment}
          disabled
          id="payment"
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="store" color="#4caf50" size="lg" className="mr-2" />
        <TextField
          type="text"
          label="Brand"
          value={brand}
          disabled
          id="brand"
          className="w-full"
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="insert_comment" color="#e91e63" size="lg" className="mr-2" />
        <TextField
          type="textarea"
          rows={3}
          label="Details"
          value={details}
          disabled
          id="details"
          className="w-full"
        />
      </div>
      <IconButton
        icon="delete"
        size="md"
        color="error"
        onClick={onOpenDialog}
        className="fixed bottom-[calc(56px+1rem)] right-10"
      />
      <IconButton
        icon="mode"
        size="md"
        color="success"
        onClick={onEdit}
        className="fixed bottom-[calc(56px+1rem)] right-4"
      />
      {popUp && (
        <Dialog onClose={onCloseDialog} className="flex flex-col items-center">
          <Icon icon="delete_forever" size="xl" className="text-error" />
          <Typography
            as="h2"
            variant="h2"
            align="center"
          >
            Are you sure you want to delete this transaction?
          </Typography>
          <div className={css('popup-actions', 'mt-2')}>
            <Button
              variant="contained"
              size="lg"
              className="mx-4"
              onClick={onCloseDialog}
            >
              <Typography as="span" variant="body">No</Typography>
            </Button>
            <Button
              variant="transparent"
              size="lg"
              className="mx-4"
              onClick={onDelete}
            >
              <Typography as="span" variant="body">Yes</Typography>
            </Button>
          </div>
        </Dialog>
      )}
    </Layout>
  );
}
