import { useState } from 'react';
import {
  MdOutlineAttachMoney,
  MdCategory,
  MdOutlineCategory,
  MdPriceChange,
  MdEditCalendar,
  MdStore,
  MdPayment,
  MdEditNote,
} from 'react-icons/md';
import Layout from '../../../src/components/molecules/Layout';
import Radio from '../../../src/components/atoms/Radio';
import DateTimePicker from '../../../src/components/molecules/DateTimePicker';
import Select from '../../../src/components/atoms/Select';
import TextField from '../../../src/components/atoms/TextField';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction-create.module.css';

import { categoryOptions, paymentOptions } from '../../../src/fake';

export default function Create() {
  const [typeChecked, setTypeChecked] = useState('expense');
  const [datetime, setDatetime] = useState(new Date().getTime());
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [amount, setAmount] = useState();
  const [details, setDetails] = useState();
  const [brand, setBrand] = useState();
  const [payment, setPayment] = useState();
  const css = useStyles(styles);

  const onTypeChange = (e) => setTypeChecked(e.target.value);
  const onDateTimeChange = (datetime) => setDatetime(datetime);
  const onCategorySelect = (option) => setCategory(option);
  const onSubCategorySelect = (option) => setSubCategory(option);
  const onAmountChange = (e) => setAmount(e.target.value);
  const onDetailsChange = (e) => setDetails(e.target.value);
  const onBrandChange = (e) => setBrand(e.target.value);
  const onPaymentChange = (option) => setPayment(option); 

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
            checked={typeChecked === 'expense'}
          />
          <Radio
            label="Income"
            name="type"
            id="type-income"
            value="income"
            onChange={onTypeChange}
            checked={typeChecked === 'income'}
          />
        </div>
        <div className={css('input-row')}>
          <MdEditCalendar className={css('icon')} />
          <DateTimePicker
            className={css('datetime-picker')}
            label="Date Time *"
            onDateTimeChange={onDateTimeChange}
            datetime={datetime}
          />
        </div>
        <div className={css('input-row')}>
          <MdCategory className={css('icon')} />
          <Select
            label="Category *"
            onSelect={onCategorySelect}
            options={categoryOptions}
            selected={category}
            className={css('select')}
          />
        </div>
        <div className={css('input-row')}>
          <MdOutlineCategory className={css('icon')} />
          <Select
            label="Subcategory"
            onSelect={onSubCategorySelect}
            options={categoryOptions}
            selected={subCategory}
            className={css('select')}
          />
        </div>
        <div className={css('input-row')}>
          <MdPriceChange className={css('icon')} />
          <TextField
            type="number"
            label="Amount *"
            value={amount}
            onChange={onAmountChange}
            nextFocus="details"
            id="amount"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdEditNote className={css('icon')} />
          <TextField
            type="text"
            label="Details"
            value={details}
            onChange={onDetailsChange}
            nextFocus="brand"
            id="details"
            className={css('textfield')}
          />
        </div>
        <div className={css('input-row')}>
          <MdPayment className={css('icon')} />
          <Select
            label="Payment"
            onSelect={onPaymentChange}
            options={paymentOptions}
            selected={payment}
            className={css('select')}
          />
        </div>
        <div className={css('input-row')}>
          <MdStore className={css('icon')} />
          <TextField
            type="text"
            label="Brand"
            value={brand}
            onChange={onBrandChange}
            id="brand"
            className={css('textfield')}
          />
        </div>
      </main>
    </Layout>
  );
}
