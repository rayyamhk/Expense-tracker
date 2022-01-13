import { useState } from 'react';
import useDatabase from '../../../src/hooks/useDatabase';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction-create.module.css';
import Transaction from '../../../src/utils/Transaction';
import DateTime from '../../../src/utils/DateTime';

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

import settings, { paymentOptions } from '../../../src/fake';

export default function Create() {
  const [submitted, setSubmitted] = useState(false);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [transaction, setTransaction] = useState(Transaction.default());
  const db = useDatabase('my-test-app');
  const { showSnackbar } = useSnackbar();
  const css = useStyles(styles);

  const onTypeChange = (e) => {
    setTransaction({ ...transaction, type: e.target.value });
  };

  const onDateTimeChange = (YYYY, MM, DD, hh, mm) => {
    const timestamp = DateTime.getTimestampFromArray([YYYY, MM, DD, hh, mm]);
    setTransaction({ ...transaction, datetime: timestamp });
  };

  const onCategorySelect = (option) => {
    let subcategories = settings.subcategories[option.value];
    subcategories = Object.entries(subcategories).map(([value, display]) => ({ value, display }));
    setTransaction({ ...transaction, category: option });
    setSubcategoryOptions(subcategories);
  };

  const onSubcategorySelect = (option) => {
    setTransaction({ ...transaction, subcategory: option });
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
    setTransaction({ ...transaction, payment: option });
  };

  const onSubmit = async () => {
    setSubmitted(true);
    const { category, amount } = transaction;
    if (!category || (!amount && amount !== 0)) {
      showSnackbar('error', 'Some fields are missing.');
      return;
    }
    if (Number(amount) < 0) {
      showSnackbar('error', 'Amount should be non-negative.');
      return;
    }

    db.connect('transactions', 'readwrite')
      .then((store) => store.add(Transaction.parseForDatabase(transaction)))
      .then(() => {
        setSubmitted(false);
        setTransaction(Transaction.default());
        showSnackbar('success', 'Transaction created!');
      })
      .catch((e) => {
        showSnackbar('error', `${e.name}: ${e.message}`);
      });
  };

  const [year, month, day, hour, minute] = DateTime.getArrayFromTimestamp(transaction.datetime);
  const categoryOptions = Object.entries(settings.categories).map(([value, opt]) => ({ value, ...opt }));

  return (
    <Layout headline="Create Transaction">
      <main className={css('main')}>
        <div className={css('input-row')}>
          <MdOutlineAttachMoney className={css('icon')} />
          <Radio
            label="Expense"
            name="type"
            id="type-expense"
            value="expense"
            onChange={onTypeChange}
            checked={transaction.type === 'expense'}
          />
          <Radio
            label="Income"
            name="type"
            id="type-income"
            value="income"
            onChange={onTypeChange}
            checked={transaction.type === 'income'}
          />
        </div>
        <div className={css('input-row')}>
          <MdEditCalendar className={css('icon')} />
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
          <MdCategory className={css('icon')} />
          <Select
            label="Category *"
            onSelect={onCategorySelect}
            options={categoryOptions}
            selected={transaction.category}
            error={submitted && !transaction.category}
            className={css('select')}
          />
        </div>
        <div className={css('input-row')}>
          <MdOutlineCategory className={css('icon')} />
          <Select
            label="Subcategory"
            onSelect={onSubcategorySelect}
            options={subcategoryOptions}
            selected={transaction.subcategory}
            className={css('select')}
          />
        </div>
        <div className={css('input-row')}>
          <MdPriceChange className={css('icon')} />
          <TextField
            type="number"
            label="Amount *"
            value={transaction.amount}
            onChange={onAmountChange}
            error={submitted && !transaction.amount && transaction.amount !== 0}
            min="0"
            nextFocus="brand"
            id="amount"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdPayment className={css('icon')} />
          <Select
            label="Payment"
            onSelect={onPaymentChange}
            options={paymentOptions}
            selected={transaction.payment}
            className={css('select')}
          />
        </div>
        <div className={css('input-row')}>
          <MdStore className={css('icon')} />
          <TextField
            type="text"
            label="Brand"
            value={transaction.brand}
            onChange={onBrandChange}
            id="brand"
            nextFocus='details'
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdEditNote className={css('icon')} />
          <TextField
            type="textarea"
            rows="3"
            label="Details"
            value={transaction.details}
            onChange={onDetailsChange}
            id="details"
            className={css('textfield')}
          />
        </div>
        <Button onClick={onSubmit} float>
          <MdDone />
        </Button>
      </main>
    </Layout>
  );
}
