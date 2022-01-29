import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useSettings from '../../../src/hooks/useSettings';
import useSnackbar from '../../../src/hooks/useSnackbar';
import TransactionUtils from '../../../src/utils/Transaction';
import DateTimeUtils from '../../../src/utils/DateTime';
import SettingUtils from '../../../src/utils/Settings';

import Layout from '../../../src/components/organisms/Layout';
import DateTimePicker from '../../../src/components/organisms/DateTimePicker';
import Radio from '../../../src/components/molecules/Radio';
import Select from '../../../src/components/molecules/Select';
import TextField from '../../../src/components/molecules/TextField';
import Icon from '../../../src/components/atoms/Icon';
import IconButton from '../../../src/components/atoms/IconButton';

import {
  SelectedItem,
  Transaction,
} from '../../../src/types';

export default function Create() {
  const [pageMode, setPageMode] = useState<'create' | 'edit'>('create');
  const [submitted, setSubmitted] = useState(false);
  const [transaction, setTransaction] = useState(TransactionUtils.default());
  const [subcategories, setSubcategories] = useState<SelectedItem[]>([]);
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
          return;
        }
        const category = transaction.category;

        store = await db.connect('subcategories');
        const index = store.index('category_index');
        const { result: subcategories }: { result: SelectedItem[] } = await index.getAll(category);
        setSubcategories(subcategories);
        setTransaction(transaction);
        setPageMode('edit');
      } catch ({ name, message }) {
        setTransaction(TransactionUtils.default());
        setSnackbar('error', `${name}: ${message}`);
      }
    };
    init();
    return () => { isMounted = false; };
  }, [router]);

  if (!settings) {
    return <h1>Loading.</h1>;
  };

  const onTypeChange = (value: 'expense' | 'income') => {
    setTransaction({ ...transaction, type: value });
  };

  const onDateTimeChange = (YYYY: number, MM: number, DD: number, hh: number, mm: number) => {
    const timestamp = DateTimeUtils.getTimestampFromArray([YYYY, MM, DD, hh, mm]);
    setTransaction({ ...transaction, datetime: timestamp });
  };

  const onCategorySelect = async (id: string) => {
    try {
      const store = await db.connect('subcategories');
      const index = store.index('category_index');
      const { result: subcategories }: { result: SelectedItem[] } = await index.getAll(id);
      setSubcategories(subcategories);
      setTransaction({ ...transaction, category: id, subcategory: undefined });
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };

  const onSubcategorySelect = (id: string) => {
    setTransaction({ ...transaction, subcategory: id });
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction({ ...transaction, amount: Number(e.target.value) });
  };

  const onDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction({ ...transaction, details: e.target.value });
  };

  const onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction({ ...transaction, brand: e.target.value });
  };

  const onPaymentChange = (id: string) => {
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
      if (amount < 0) {
        setSnackbar('error', 'Amount should be non-negative.');
        return;
      }
      const store = await db.connect('transactions', 'readwrite');
      await store.put(TransactionUtils.parseForDatabase(transaction));
      if (pageMode === 'edit') {
        router.push(`/app/transactions/${transaction.id}`);
        setSnackbar('success', 'Transaction updated!');
      } else {
        router.push('/app');
        setSnackbar('success', 'Transaction created!');
      }
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };

  const headline = pageMode === 'create' ? 'Create' : 'Edit';
  const _payments = SettingUtils.arrayToObject(settings.payments) as SelectedItem[];
  const _categories = SettingUtils.arrayToObject(settings.categories) as SelectedItem[];
  const _subcategories = SettingUtils.arrayToObject(subcategories) as SelectedItem[];

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
  const [year, month, day, hour, minute] = DateTimeUtils.getArrayFromTimestamp(datetime);
  const categorySelected: SelectedItem = category ? { id: category, value: _categories[category]?.value } : undefined;
  const subcategorySelected: SelectedItem = subcategory ? { id: subcategory, value: _subcategories[subcategory]?.value } : undefined;
  const paymentSelected: SelectedItem = payment ? { id: payment, value: _payments[payment]?.value } : undefined;

  return (
    <Layout headline={headline}>
      <div className="flex mb-5">
        <Icon icon="attach_money" size="lg" className="text-disabled mr-4" />
        <Radio
          label="Expense"
          name="type"
          id="type-expense"
          value="expense"
          onChange={onTypeChange}
          checked={type === 'expense'}
          className="mr-4"
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
      <div className="flex mb-5">
        <Icon icon="edit_calendar" className="text-disabled mr-4" />
        <DateTimePicker
          className="w-full"
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
      <div className="flex mb-5">
        <Icon icon="category" className="text-disabled mr-4" />
        <Select
          label="Category *"
          onSelect={onCategorySelect}
          options={settings.categories}
          selected={categorySelected}
          error={submitted && !category}
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="dashboard" className="text-disabled mr-4" />
        <Select
          label="Subcategory"
          onSelect={onSubcategorySelect}
          options={subcategories}
          selected={subcategorySelected}
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="price_change" className="text-disabled mr-4" />
        <TextField
          type="number"
          label="Amount *"
          value={amount?.toString() || ''}
          onChange={onAmountChange}
          error={submitted && amount < 0}
          min="0"
          next="brand"
          id="amount"
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="payment" className="text-disabled mr-4" />
        <Select
          label="Payment"
          onSelect={onPaymentChange}
          options={settings.payments}
          selected={paymentSelected}
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="store" className="text-disabled mr-4" />
        <TextField
          type="text"
          label="Brand"
          value={brand}
          onChange={onBrandChange}
          id="brand"
          next='details'
          className="w-full"
        />
      </div>
      <div className="flex mb-5">
        <Icon icon="edit_note" className="text-disabled mr-4" />
        <TextField
          type="textarea"
          rows={3}
          label="Details"
          value={details}
          onChange={onDetailsChange}
          id="details"
          className="w-full"
        />
      </div>
      <IconButton
        icon="done"
        size="md"
        onClick={onSubmit}
        color="success"
        className="fixed bottom-[calc(56px+1rem)] right-4"
      />
    </Layout>
  );
}
