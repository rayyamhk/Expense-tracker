import { useState } from 'react';
import useDatabase from '../../../src/hooks/useDatabase';
import useSnackbar from '../../../src/hooks/useSnackbar';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction-create.module.css';
import utils from '../../../src/utils/Transaction';

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

import { categoryOptions, paymentOptions } from '../../../src/fake';

export default function Create() {
  const [submitted, setSubmitted] = useState(false);
  const [transaction, setTransaction] = useState(utils.default());
  const db = useDatabase('my-test-app');
  const { showSnackbar } = useSnackbar();
  const css = useStyles(styles);

  const onTypeChange = (e) => {
    setTransaction({ ...transaction, type: e.target.value });
  };

  const onDateTimeChange = (datetime) => {
    setTransaction({ ...transaction, datetime });
  };

  const onCategorySelect = (option) => {
    setTransaction({ ...transaction, category: option });
  };

  const onSubCategorySelect = (option) => {
    setTransaction({ ...transaction, subCategory: option });
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
      .then((store) => store.add(utils.parseForDatabase(transaction)))
      .then(() => {
        setSubmitted(false);
        setTransaction(utils.default());
        showSnackbar('success', 'Transaction created!');
      })
      .catch((e) => {
        showSnackbar('error', `${e.name}: ${e.message}`);
      });
  };

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
            datetime={transaction.datetime}
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
            onSelect={onSubCategorySelect}
            options={categoryOptions}
            selected={transaction.subCategory}
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
