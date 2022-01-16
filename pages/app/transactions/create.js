import {
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction.module.css';
import Transaction from '../../../src/utils/Transaction';
import DateTime from '../../../src/utils/DateTime';
import Settings from '../../../src/utils/Settings';

import {
  MdOutlineAttachMoney,
  MdCategory,
  MdOutlineCategory,
  MdPriceChange,
  MdEditCalendar,
  MdStore,
  MdPayment,
  MdEditNote,
  MdDone,
} from 'react-icons/md';
import Layout from '../../../src/components/molecules/Layout';
import Radio from '../../../src/components/atoms/Radio';
import DateTimePicker from '../../../src/components/molecules/DateTimePicker';
import Select from '../../../src/components/atoms/Select';
import TextField from '../../../src/components/atoms/TextField';
import Button from '../../../src/components/atoms/Button';
import Loading from '../../../src/components/molecules/Loading';

const settings = Settings.getFakeSettings();
const categories = settings.categories;
const categoryOptions = Settings.parseCategoryOptions(categories);
const payments = settings.payments;
const paymentOptions = Settings.parsePaymentOptions(payments);

export default function Create() {
  const router = useRouter();
  const [pageMode, setPageMode] = useState('loading');
  const [submitted, setSubmitted] = useState(false);
  const [subcategories, setSubcategories] = useState();
  const [transaction, setTransaction] = useState(Transaction.default());
  const db = useDatabase('my-test-app');
  const { setSnackbar } = useSnackbar();
  const css = useStyles(styles);

  useEffect(() => {
    let isMounted = true;
    if (router.isReady && isMounted) {
      const id = router.query.id;
      if (id) {
        db.connect('transactions')
        .then((store) => store.get(id))
        .then((record) => {
          const category = record.category;
          setSubcategories(settings.subcategories[category]);
          setTransaction(record);
          setPageMode('edit');
        })
        .catch(({ name, message }) => {
          setTransaction(Transaction.default());
          setPageMode('create');
          setSnackbar('error', `${name}: ${message}`);
        });
      } else {
        setPageMode('create');
      }
    }
    return () => isMounted = false;
  }, [router, db, setSnackbar]);

  if (pageMode === 'loading') {
    return <Loading />;
  }

  const onTypeChange = (e) => {
    setTransaction({ ...transaction, type: e.target.value });
  };

  const onDateTimeChange = (YYYY, MM, DD, hh, mm) => {
    const timestamp = DateTime.getTimestampFromArray([YYYY, MM, DD, hh, mm]);
    setTransaction({ ...transaction, datetime: timestamp });
  };

  const onCategorySelect = (option) => {
    const value = option.value;
    const subcategories = settings.subcategories[value];
    setTransaction({ ...transaction, category: value, subcategory: undefined });
    setSubcategories(subcategories);
  };

  const onSubcategorySelect = (option) => {
    setTransaction({ ...transaction, subcategory: option.value });
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

  const onPaymentChange = (option) => {
    setTransaction({ ...transaction, payment: option.value });
  };

  const onSubmit = () => {
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

    db.connect('transactions', 'readwrite')
      .then((store) => store.put(Transaction.parseForDatabase(transaction)))
      .then(() => {
        if (pageMode === 'edit') {
          router.push(`/app/transactions/${transaction.id}`);
          setSnackbar('success', 'Transaction updated!');
        } else {
          router.push('/app');
          setSnackbar('success', 'Transaction created!');
        }
      })
      .catch((e) => setSnackbar('error', `${e.name}: ${e.message}`));
  };

  const headline = pageMode === 'create' ? 'Create' : 'Edit';
  const subcategoryOptions = Settings.parseSubcategoryOptions(subcategories);
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
  const categorySelected = category ? { value: category, display: categories[category].display } : undefined;
  const subcategorySelected = subcategory ? { value: subcategory, display: subcategories[subcategory] } : undefined;
  const paymentSelected = payment ? { value: payment, display: payments[payment].display } : undefined;

  return (
    <Layout headline={headline} className={css('main')}>
      <div className={css('input-row')}>
        <MdOutlineAttachMoney className={css('icon', 'gray')} />
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
        <MdEditCalendar className={css('icon', 'gray')} />
        <DateTimePicker
          className={css('datetime-picker')}
          label="Date Time *"
          onDateTimeChange={onDateTimeChange}
          year={year}
          month={month}
          day={day}
          hour={hour}
          minute={minute}
        />
      </div>
      <div className={css('input-row')}>
        <MdCategory className={css('icon', 'gray')} />
        <Select
          label="Category *"
          onSelect={onCategorySelect}
          options={categoryOptions}
          selected={categorySelected}
          error={submitted && !category}
          className={css('select')}
        />
      </div>
      <div className={css('input-row')}>
        <MdOutlineCategory className={css('icon', 'gray')} />
        <Select
          label="Subcategory"
          onSelect={onSubcategorySelect}
          options={subcategoryOptions}
          selected={subcategorySelected}
          className={css('select')}
        />
      </div>
      <div className={css('input-row')}>
        <MdPriceChange className={css('icon', 'gray')} />
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
        <MdPayment className={css('icon', 'gray')} />
        <Select
          label="Payment"
          onSelect={onPaymentChange}
          options={paymentOptions}
          selected={paymentSelected}
          className={css('select')}
        />
      </div>
      <div className={css('input-row')}>
        <MdStore className={css('icon', 'gray')} />
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
        <MdEditNote className={css('icon', 'gray')} />
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
        <MdDone />
      </Button>
    </Layout>
  );
}
