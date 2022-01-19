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
import Settings from '../../../src/utils/Settings';

import Layout from '../../../src/components/molecules/Layout';
import Icon from '../../../src/components/atoms/Icon';
import Radio from '../../../src/components/atoms/Radio';
import DateTimePicker from '../../../src/components/molecules/DateTimePicker';
import Select from '../../../src/components/atoms/Select';
import TextField from '../../../src/components/atoms/TextField';
import Button from '../../../src/components/atoms/Button';

export default function Create() {
  const [pageMode, setPageMode] = useState('create');
  const [submitted, setSubmitted] = useState(false);
  const [transaction, setTransaction] = useState(Transaction.default());
  const [subcategories, setSubcategories] = useState([]);
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
          return;
        }
        const category = transaction.category;

        store = await db.connect('subcategories');
        const index = await store.index('category_index');
        const { result: subcategories } = await index.getAll(category);
        setSubcategories(subcategories);
        setTransaction(transaction);
        setPageMode('edit');
      } catch ({ name, message }) {
        setTransaction(Transaction.default());
        setSnackbar('error', `${name}: ${message}`);
      }
    };
    init();
    return () => isMounted = false;
  }, [router]);

  useEffect(() => console.log('rerender'))

  if (!settings) {
    return <h1>Loading.</h1>;
  }

  const onTypeChange = (e) => {
    setTransaction({ ...transaction, type: e.target.value });
  };

  const onDateTimeChange = (YYYY, MM, DD, hh, mm) => {
    const timestamp = DateTime.getTimestampFromArray([YYYY, MM, DD, hh, mm]);
    setTransaction({ ...transaction, datetime: timestamp });
  };

  const onCategorySelect = async (id) => {
    try {
      const store = await db.connect('subcategories');
      const index = await store.index('category_index');
      const { result: subcategories } = await index.getAll(id);
      setSubcategories(subcategories);
      setTransaction({ ...transaction, category: id, subcategory: undefined });
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };

  const onSubcategorySelect = (id) => {
    setTransaction({ ...transaction, subcategory: id });
  };

  const onAmountChange = (e) => {
    setTransaction({ ...transaction, amount: e.target.value });
  };

  const onDetailsChange = (e) => {
    setTransaction({ ...transaction, details: e.target.value });
  };

  const onBrandChange = (e) => {
    setTransaction({ ...transaction, brand: e.target.value });
  };

  const onPaymentChange = (id) => {
    setTransaction({ ...transaction, payment: id });
  };

  const onSubmit = async () => {
    try {
      setSubmitted(true);
      const { category, amount } = transaction;
      if (!category || !amount) {
        setSnackbar('error', 'Some fields are missing.');
        return;
      }
      if (Number(amount) < 0) {
        setSnackbar('error', 'Amount should be non-negative.');
        return;
      }
      const store = await db.connect('transactions', 'readwrite');
      await store.put(Transaction.parseForDatabase(transaction));
      if (pageMode === 'edit') {
        router.push(`/app/transactions/${transaction.id}`);
        setSnackbar('success', 'Transaction updated!');
      } else {
        router.push('/app');
        setSnackbar('success', 'Transaction created!');
      }
    } catch ({ name, message }) {
      setSnackbar('error', `${e.name}: ${e.message}`);
    }
  };

  const headline = pageMode === 'create' ? 'Create' : 'Edit';
  const _payments = Settings.arrayToObject(settings.payments);
  const _categories = Settings.arrayToObject(settings.categories);
  const _subcategories = Settings.arrayToObject(subcategories);

  const {
    type,
    datetime,
    category,
    subcategory,
    amount,
    payment,
    brand,
    details,
  } = transaction;
  const [year, month, day, hour, minute] = DateTime.getArrayFromTimestamp(datetime);
  const categorySelected = category ? { id: category, value: _categories[category]?.value } : undefined;
  const subcategorySelected = subcategory ? { id: subcategory, value: _subcategories[subcategory]?.value } : undefined;
  const paymentSelected = payment ? { id: payment, value: _payments[payment]?.value } : undefined;

  return (
    <Layout headline={headline} className={css('main')}>
      <div className={css('input-row')}>
        <Icon icon="attach_money" className={css('icon', 'gray')} />
        <Radio
          label="Expense"
          name="type"
          id="type-expense"
          value="expense"
          onChange={onTypeChange}
          checked={type === 'expense'}
        />
        <Radio
          label="Income"
          name="type"
          id="type-income"
          value="income"
          onChange={onTypeChange}
          checked={type === 'income'}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="edit_calendar" className={css('icon', 'gray')} />
        <DateTimePicker
          className={css('datetime-picker')}
          label="Date Time *"
          onDateTimeChange={onDateTimeChange}
          year={year}
          month={month}
          day={day}
          hour={hour}
          minute={minute}
          settings={settings}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="category" className={css('icon', 'gray')} />
        <Select
          label="Category *"
          onSelect={onCategorySelect}
          options={settings.categories}
          selected={categorySelected}
          error={submitted && !category}
          className={css('select')}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="dashboard" className={css('icon', 'gray')} />
        <Select
          label="Subcategory"
          onSelect={onSubcategorySelect}
          options={subcategories}
          selected={subcategorySelected}
          className={css('select')}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="price_change" className={css('icon', 'gray')} />
        <TextField
          type="number"
          label="Amount *"
          value={amount}
          onChange={onAmountChange}
          error={submitted && !amount}
          min="0"
          nextFocus="brand"
          id="amount"
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="payment" className={css('icon', 'gray')} />
        <Select
          label="Payment"
          onSelect={onPaymentChange}
          options={settings.payments}
          selected={paymentSelected}
          className={css('select')}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="store" className={css('icon', 'gray')} />
        <TextField
          type="text"
          label="Brand"
          value={brand}
          onChange={onBrandChange}
          id="brand"
          nextFocus='details'
          className={css('textfield')}
        />
      </div>
      <div className={css('input-row')}>
        <Icon icon="edit_note" className={css('icon', 'gray')} />
        <TextField
          type="textarea"
          rows="3"
          label="Details"
          value={details}
          onChange={onDetailsChange}
          id="details"
          className={css('textfield')}
        />
      </div>
      <Button
        onClick={onSubmit}
        shape="circle"
        variant="success"
        float
        className={css('float-btn')}
      >
        <Icon icon="done" />
      </Button>
    </Layout>
  );
}
