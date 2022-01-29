import { nanoid } from 'nanoid';
import SettingUtils from './Settings';
import {
  Transaction,
  TransactionDisplayProps,
  Settings,
} from '../types';

const moneyUnit = {
  2: 'K',
  3: 'M',
  4: 'B',
};

const Transaction = {
  default: (): Transaction => ({
    id: nanoid(10),
    type: 'expense',
    datetime: Date.now(),
    category: undefined,
    subcategory: undefined,
    amount: undefined,
    payment: undefined,
    brand: undefined,
    details: undefined,
  }),
  parseForDatabase: (transaction: Transaction): Transaction => {
    const brand = typeof transaction.brand === 'string' && transaction.brand.trim() || undefined;
    const details = typeof transaction.details === 'string' && transaction.details.trim() || undefined;
    return {
      ...transaction,
      brand,
      details,
    };
  },
  parseForDisplay: (transaction: Transaction, settings: Settings): TransactionDisplayProps => {
    const { payments, categories, subcategories } = settings;
    const { payment, category, subcategory } = transaction;
    const _payments = SettingUtils.arrayToObject(payments);
    const _categories = SettingUtils.arrayToObject(categories);
    const _subcategories = SettingUtils.arrayToObject(subcategories);
    return {
      ...transaction, // id, type, datetime, amount, brand, details
      ..._categories[category], // icon, iconType, color
      category: _categories[category].value,
      subcategory: _subcategories[subcategory]?.value,
      payment: _payments[payment]?.value,
    };
  },
  parseMoney: (value: number, short = false) => {
    const isNegative = value < 0;
    value = Math.abs(value);
    const strValue = value.toString();
    let [int, dec] = strValue.split('.');
    if (dec !== undefined && dec.length > 2) {
      dec = Math.round(Number(dec) / (10 ** (dec.length - 2))).toString();
    }
    const unit = Math.ceil(int.length / 3);
    if (!short || unit < 2) {
      let str = int.split('').reverse().reduce((moneyStr, digit, idx) => {
        moneyStr += digit;
        if (idx % 3 === 2) {
          moneyStr += ',';
        }
        return moneyStr;
      }, '');
      str = str.split('').reverse().join('');
      if (str.charAt(0) === ',') {
        str = `$${str.slice(1)}${dec ? `.${dec}` : ''}`;
      } else {
        str = `$${str}${dec ? `.${dec}` : ''}`;
      }
      if (isNegative) {
        str = '-' + str;
      }
      return str;
    }
    // short
    let temp = Number(int);
    temp = temp / Math.pow(10, (unit - 1) * 3);
    int = temp.toFixed(2).toString();
    let str = `${int}${moneyUnit[unit]}`;
    if (isNegative) {
      str = '-' + str;
    }
    return str;
  },
};

export default Transaction;
