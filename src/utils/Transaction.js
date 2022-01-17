import { nanoid } from 'nanoid';
import Settings from './Settings';

const moneyUnit = {
  2: 'K',
  3: 'M',
  4: 'B',
};

const Transaction = {
  default: () => ({
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
  parseForDatabase: (transaction) => {
    const brand = typeof transaction.brand === 'string' && transaction.brand.trim() || undefined;
    const details = typeof transaction.details === 'string' && transaction.details.trim() || undefined;
    return {
      ...transaction,
      amount: Number(transaction.amount),
      brand,
      details,
    };
  },
  parseForDisplay: (transaction, { payments, categories, subcategories }) => {
    const _payments = Settings._arrayToObject(payments);
    const _categories = Settings._arrayToObject(categories);
    const _subcategories = Settings._arrayToObject(subcategories);
    const { payment, category, subcategory } = transaction;
    return {
      ...transaction, // id, type, datetime, amount, brand, details
      ..._categories[category], // icon, iconType, color
      category: _categories[category].value,
      subcategory: _subcategories[subcategory]?.value,
      payment: _payments[payment]?.value,
    };
  },
  parseMoney: (value, short = false) => {
    const isNegative = value < 0;
    value = Math.abs(value);
    const strValue = value.toString();
    const [int, dec] = strValue.split('.');
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
    int = Number(int);
    int = int / Math.pow(10, (unit - 1) * 3);
    int = int.toFixed(2).toString();
    let str = `${int}${moneyUnit[unit]}`;
    if (isNegative) {
      str = '-' + str;
    }
    return str;
  },
};

export default Transaction;
